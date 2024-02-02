using System;
using System.Collections.Generic;

namespace Notes_ESPI_en_mieux.Entities;

public partial class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Nom { get; set; } = null!;

    public string Prenom { get; set; } = null!;

    public string Role { get; set; } = null!;

    public int? IdClasse { get; set; }
}
