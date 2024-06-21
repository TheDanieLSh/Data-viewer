using System;
using Nancy;
using Nancy.Hosting.Self;

var uri = new Uri("http://localhost:5000");
using var host = new NancyHost(uri);
host.Start();

Console.WriteLine("Nancy is running on http://localhost:5000");
Console.ReadLine();
host.Stop();
