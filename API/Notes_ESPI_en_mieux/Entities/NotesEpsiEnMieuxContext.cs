using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Notes_ESPI_en_mieux.Entities;

public partial class NotesEpsiEnMieuxContext : DbContext
{
    public NotesEpsiEnMieuxContext()
    {
    }

    public NotesEpsiEnMieuxContext(DbContextOptions<NotesEpsiEnMieuxContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Classe> Classes { get; set; }

    public virtual DbSet<Cours> Cours { get; set; }

    public virtual DbSet<Evaluation> Evaluations { get; set; }

    public virtual DbSet<Note> Notes { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<CoursClasses> CoursClasses { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    { }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Classe>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("classe");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Nom).HasMaxLength(255);
        });

        modelBuilder.Entity<Cours>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("cours");

            entity.HasIndex(e => e.IdProf, "ID_Prof");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.IdProf).HasColumnName("ID_Prof");
            entity.Property(e => e.Titre).HasMaxLength(255);
        });

        modelBuilder.Entity<CoursClasses>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("coursclasse");

            entity.HasIndex(e => e.IdClasse, "ID_Classe");

            entity.HasIndex(e => e.IdCours, "ID_Cours");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.IdClasse).HasColumnName("ID_Classe");
            entity.Property(e => e.IdCours).HasColumnName("ID_Cours");
        });

        modelBuilder.Entity<Evaluation>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("evaluation");

            entity.HasIndex(e => e.IdCours, "ID_Cours");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Date).HasColumnType("date");
            entity.Property(e => e.IdCours).HasColumnName("ID_Cours");
            entity.Property(e => e.Sujet).HasMaxLength(255);
        });

        modelBuilder.Entity<Note>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("note");

            entity.HasIndex(e => e.IdEvaluation, "ID_Evaluation");

            entity.HasIndex(e => e.IdUser, "ID_User");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.IdEvaluation).HasColumnName("ID_Evaluation");
            entity.Property(e => e.IdUser).HasColumnName("ID_User");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.IdClasse, "ID_classe");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.IdClasse).HasColumnName("ID_classe");
            entity.Property(e => e.Nom).HasMaxLength(255);
            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.Prenom).HasMaxLength(255);
            entity.Property(e => e.Role).HasMaxLength(255);
            entity.Property(e => e.Username).HasMaxLength(255);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
