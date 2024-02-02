using System;
using System.Collections.Generic;

namespace Notes_ESPI_en_mieux.Entities;

public partial class Note
{
    public int Id { get; set; }

    public int? IdEleve { get; set; }

    public int? IdEvaluation { get; set; }

    public float? Valeur { get; set; }

    public int Coefficient { get; set; }
}
