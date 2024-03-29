﻿using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WordFinder.Models;
using System.Collections.Generic;


namespace WordFinder.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult FindWords(List<string> mainMatrix, List<string> wordsToFind)
        {
            WordFinderModel wordFinder = new WordFinderModel(mainMatrix);
            wordFinder.RotateMatrix();
            return new JsonResult(wordFinder.Find(wordsToFind));
        }
    }
}