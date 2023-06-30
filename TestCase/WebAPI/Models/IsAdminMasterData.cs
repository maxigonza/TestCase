using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Enums;

namespace WebAPI.Models;

public class IsAdminMasterData
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    [NotMapped]
    public Dictionary<int, string> Selection { get; set; } = new Dictionary<int, string>() { { 0, "No"}, { 1, "Yes"} };
    
    [Required]
    public IsAdminMasterDataType Type { get; set; }
}