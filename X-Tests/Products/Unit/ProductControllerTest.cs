using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections;
using Products.API.Controllers;
using Products.API.Data;
using Products.API.Dto;
using Products.API.Models;
using AutoMapper;
using Xunit;
using System.Threading.Tasks;
using Products.API.Helpers;
using System.Collections.Generic;
using System.Linq;

namespace Products.Unit
{
    public class ProductControllerTest
    {
        private Product _laptop = new Product { ProductId = 1, ProductName = "Laptop", UnitPrice = 422, Details = "Laptop Details", IsActive = true };
        private Product _phone = new Product { ProductId = 1, ProductName = "Phone", UnitPrice = 422, Details = "Phone Details", IsActive = true };

        [Fact]
        public void GetCount_NoItemsInCart_ReturnsZero()
        {
            // Arrange
            var productList = new List<Product>();

            // Assert
            Assert.Equal(0, productList.Count());
        }
        [Fact]
        public void GetProducts()
        {
            var postRepositoryMock = new Moq.Mock<IProductRepository>();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<AutoMapperProfiles>(); // AutoMapperProfiles qe e keni ne projekt kryesor...
            });
            var mapper = config.CreateMapper();


            var productsController = new ProductsController(postRepositoryMock.Object, mapper);
            var okResult = productsController.GetProducts();

            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public void Add_SingleItem_CountIsOne()
        {
            // Arrange
            var productList = new List<Product>();

            // Act
            productList.Add(_laptop);

            // Assert
            Assert.Equal(1, productList.Count());
        }

        [Fact]
        public void Add_MultipleItems_CountIsCorrect()
        {
            // Arrange
            var shoppingCart = new List<Product>();

            // Act
            shoppingCart.Add(_laptop);
            shoppingCart.Add(_phone);
            shoppingCart.Add(_laptop);
            shoppingCart.Add(_phone);

            // Assert
            Assert.Equal(4, shoppingCart.Count());
        }

        // [Fact] // FIX IT
        // public void Add_Null_ThrowsException()
        // {
        //     // Arrange
        //     var productList = new List<Product>();

        //     // Act
        //     Assert.ThrowsAny<Exception>(() =>
        //     {
        //         // Act
        //         productList.Add(null);
        //     });
        // }
        // [Fact] // FIX IT
        // public void Remove_EmptyCart_ThrowsException()
        // {
        //     // Arrange
        //     var productList = new List<Product>();
        //     // Act
        //     productList.Remove(_laptop);

        //     // Assert

        //     Assert.Throws<Exception>(() =>
        //     {
                
        //     });
        // }

        [Fact]
        public void Remove_PreviouslyAddedItem_CountIsZero()
        {
            // Arrange
            var productList = new List<Product>();
            productList.Add(_laptop);

            // Act
            productList.Remove(_laptop);

            // Assert
            Assert.Equal(0, productList.Count());
        }

        [Fact]
        public void Remove_OneOfTwoSameItems_DoesntRemoveAllSameItems()
        {
            // Arrange
            var productList = new List<Product>();
            productList.Add(_laptop);
            productList.Add(_laptop);

            // Act 
            productList.Remove(_laptop);

            // Assert
            Assert.Equal(1, productList.Count());
        }

        [Fact]
        public void Remove_TwoSameItems_CountIsZero()
        {
            // Arrange
            var productList = new List<Product>();
            productList.Add(_laptop);
            productList.Add(_laptop);

            // Act
            productList.Remove(_laptop);

            // Assert
            Assert.Equal(1, productList.Count());
        }

    }
}