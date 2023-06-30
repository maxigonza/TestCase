using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    public ApiDbContext _dbContext;

    public UserController(ApiDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("all")]
    public IActionResult GetUsers()
    {
        var users = _dbContext.Users.ToList().OrderBy(u => u.Id);
        return Ok(users);
    }

    [HttpGet("{id}")]
    public IActionResult GetUserById(int id)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
        return Ok(user);
    }

    [HttpPost("add")]
    public IActionResult AddUser([FromBody] User user)
    {
        if (user == null)
        {
            return BadRequest();
        }

        _dbContext.Users.Add(user);
        _dbContext.SaveChanges();

        return Ok(user);
    }

    [HttpPost("update")]
    public IActionResult UpdateUser([FromQuery] int id, [FromBody] User user)
    {
        if (user == null || id != user.Id)
        {
            return BadRequest();
        }

        var existingUser = _dbContext.Users.FirstOrDefault(u => u.Id == id);
        if (existingUser == null)
        {
            return NotFound("User no longer exists");
        }

        _dbContext.Entry(existingUser).CurrentValues.SetValues(user);
        _dbContext.SaveChanges();

        return Ok(user);
    }

    [HttpDelete]
    public IActionResult DeleteUser([FromQuery] int id)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Id == id);
        if (user == null)
        {
            return NotFound();
        }

        _dbContext.Users.Remove(user);
        _dbContext.SaveChanges();

        return Ok(user);
    }
}