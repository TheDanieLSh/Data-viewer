using Nancy;

public class MainModule : NancyModule
{
    private readonly static HttpClient httpClient = new HttpClient();
    public MainModule()
    {
        Get("/", args => "Hello from Nancy!");

        Post("/send_file", async args =>
        {
              var resp = await httpClient.GetAsync(args);
              var jsonString = await resp.Content.ReadAsStringAsync();
              Console.WriteLine(jsonString);
        });

        //Post("/parsejson", args =>
        //{
        //    var json = this.Request.Body.AsString();
        //    return Response.AsText(json);
        //});

        //Post("/parsexml", args =>
        //{
        //    var xml = this.Request.Body.AsString();
        //    return Response.AsText(xml);
        //});
    }
}

public static class Extensions
{
    public static string AsString(this Stream stream)
    {
        using (var reader = new StreamReader(stream))
        {
            return reader.ReadToEnd();
        }
    }
}
