namespace Notes_ESPI_en_mieux.Models
{
    public class CreateCoursModel
    {
        public int IdProf { get; set; }
        public string Titre { get; set; }
        public string Description { get; set; }
        public List<int> IdClasses { get; set; }
    }
}
