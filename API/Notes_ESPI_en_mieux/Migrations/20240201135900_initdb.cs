using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace Notes_ESPI_en_mieux.Migrations
{
    /// <inheritdoc />
    public partial class initdb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "classe",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Nom = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "cours",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    ID_Prof = table.Column<int>(type: "int", nullable: true),
                    Titre = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "evaluation",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    ID_Cours = table.Column<int>(type: "int", nullable: true),
                    Sujet = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    Date = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "note",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    ID_Eleve = table.Column<int>(type: "int", nullable: true),
                    ID_Evaluation = table.Column<int>(type: "int", nullable: true),
                    Valeur = table.Column<float>(type: "float", nullable: true),
                    Coefficient = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    Password = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    Nom = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    Prenom = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    Role = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    ID_classe = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.ID);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "ID_Prof",
                table: "cours",
                column: "ID_Prof");

            migrationBuilder.CreateIndex(
                name: "ID_Cours",
                table: "evaluation",
                column: "ID_Cours");

            migrationBuilder.CreateIndex(
                name: "ID_Eleve",
                table: "note",
                column: "ID_Eleve");

            migrationBuilder.CreateIndex(
                name: "ID_Evaluation",
                table: "note",
                column: "ID_Evaluation");

            migrationBuilder.CreateIndex(
                name: "ID_classe",
                table: "user",
                column: "ID_classe");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "classe");

            migrationBuilder.DropTable(
                name: "cours");

            migrationBuilder.DropTable(
                name: "evaluation");

            migrationBuilder.DropTable(
                name: "note");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
