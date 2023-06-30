using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers;
[ApiController]
[Route("api/[controller]")]
public class MasterDataController: ControllerBase
{
    public ApiDbContext _dbContext;

    public MasterDataController(ApiDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    [HttpGet("isAdminSelection")]
    public IActionResult GetUsers()
    {
        Random rand = new Random();  
        int skipper = rand.Next(0, _dbContext.IsAdminMasterData.Count());  
        var masterData = _dbContext
            .IsAdminMasterData
            .OrderBy(product => Guid.NewGuid())
            .Skip(skipper)
            .Take(1)
            .FirstOrDefault();
        return Ok(masterData);
    }
}