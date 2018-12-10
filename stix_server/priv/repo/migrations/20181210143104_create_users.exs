defmodule StixServer.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :nickname, :string
      add :email, :string
      add :password, :string
      add :first_name, :string
      add :last_name, :string
      add :birthday, :date
      add :status, :string
      add :info, :string
      add :phone_number, :string
      add :is_active, :boolean, default: false, null: false

      timestamps()
    end

    create unique_index(:users, [:email])
    create unique_index(:users, [:phone_number])
  end
end
