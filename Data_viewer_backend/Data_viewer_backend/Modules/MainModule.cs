using Nancy;

public class MainModule : NancyModule
{
    public MainModule()
    {
        Get("/", args => "Hello from Nancy!");

        Post("/parsejson", args =>
        {
            var json = this.Request.Body.AsString();
            return Response.AsText(json);
        });

        Post("/parsexml", args =>
        {
            var xml = this.Request.Body.AsString();
            return Response.AsText(xml);
        });
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
