using System;
using System.Collections.Generic;

namespace Notes_ESPI_en_mieux.Entities;

public partial class Evaluation
{
    public int Id { get; set; }

    public int? IdCours { get; set; }

    public string Sujet { get; set; } = null!;

    public DateTime Date { get; set; }
}
