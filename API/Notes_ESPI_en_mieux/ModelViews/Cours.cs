using System;
using System.Collections.Generic;

namespace Notes_ESPI_en_mieux.Entities;

public partial class Cours
{
    public int Id { get; set; }

    public int IdProf { get; set; }

    public string Titre { get; set; } = null!;

    public string? Description { get; set; }
}
