using System;
using Microsoft.EntityFrameworkCore;
using Products.API.Data;
using Products.API.Models;
using Xunit;


namespace Products.Unit
{
    public class ProductRepositoryTest
    {

        private DbContextOptions<DataContext> GetDbContextOptions(string dbName)
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;

            return options;
        }

        [Fact]
        public void GetById_ItemDoesntExist_ReturnsNull()
        {
            using (var context = new DataContext(GetDbContextOptions("GetById_ItemDoesntExist_ReturnsNull")))
            {
                // Arrange
                var repo = new ProductRepository(context);

                // Act
                var item = repo.GetProduct(12).Result;

                // Assert
                Assert.Null(item);
            }
        }

        [Fact]
        public void GetById_Itemexists_ReturnsItem()
        {
            using (var context = new DataContext(GetDbContextOptions("GetById_ItemExists_ReturnsTheItem")))
            {
                // Arrange
                context.Products.Add(new Product { ProductId = 123, ProductName = "Laptop", UnitPrice = 1000, Details = "Laptop Details", IsActive = true });
                context.SaveChanges();
                var repo = new ProductRepository(context);

                // Act
                var item = repo.GetProduct(123).Result;

                // Assert
                Assert.Equal(123, item.ProductId);
                Assert.Equal("Laptop", item.ProductName);
            }
        }

        [Fact]
        public void GetAll_NoItems_ReturnsEmptyList()
        {
            using (var context = new DataContext(GetDbContextOptions("GetAll_NoItems_ReturnsEmptyList")))
            {
                // Arrange
                var repo = new ProductRepository(context);

                // Act
                var productList = repo.GetProducts().Result;

                // Assert
                Assert.Empty(productList);
            }
        }

        [Fact]
        public void GetAll_SingleItem_ReturnsListWithSingleItem()
        {
            using (var context = new DataContext(GetDbContextOptions("GetAll_SingleItem_ReturnsListWithSingleItem")))
            {
                // Arrange
                context.Products.Add(new Product { ProductId = 123, ProductName = "Laptop", UnitPrice = 1000, Details = "Laptop Details", IsActive = true });
                context.SaveChanges();
                var repo = new ProductRepository(context);

                // Act
                var productList = repo.GetProducts().Result;

                // Assert
                Assert.Single(productList);
            }
        }

        [Fact]
        public void Add_SingleItem_ItemAddedSuccessfully()
        {
            using (var context = new DataContext(GetDbContextOptions("Add_SingleItem_ItemAddedSuccessfully")))
            {
                // Arrange
                var repo = new ProductRepository(context);
                var itemToAdd = new Product { ProductId = 124, ProductName = "Phone", UnitPrice = 999, IsActive = true };

                // Act
                repo.Add(itemToAdd);

                // Assert
                var item = repo.GetProduct(123).Result;
                Assert.NotNull(item);
                Assert.Equal(124, item.ProductId);
                Assert.Equal("Phone", item.ProductName);
            }
        }

        [Fact]
        public void Delete_ItemExist_ItemDeletedSuccessfully()
        {
            using (var context = new DataContext(GetDbContextOptions("Delete_ItemExist_ItemDeletedSuccessfully")))
            {
                // Arrange
                var repo = new ProductRepository(context);
                var itemToUpdate = new Product { ProductId = 123, ProductName = "Phone", UnitPrice = 1000, Details = "Phone Details", IsActive = true };

                // Act
                repo.Delete(itemToUpdate);

                // Assert
                Assert.Equal(123, itemToUpdate.ProductId);
            }
        }
        [Fact]
        public async void Delete_ItemDoesntExist_ThrownException()
        {
            using (var context = new DataContext(GetDbContextOptions("Delete_ItemExist_ItemDeletedSuccessfully")))
            {
                // Arrange
                var repo = new ProductRepository(context);
                var item = new Product { };
                
                // Act
                repo.Delete(item);
                //assert
                Assert.Equal(null, item);
             
            }
        }
    }
}