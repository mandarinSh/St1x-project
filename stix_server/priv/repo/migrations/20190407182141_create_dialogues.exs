defmodule StixServer.Repo.Migrations.CreateDialogues do
  use Ecto.Migration

  def change do
    create table(:dialogues) do
      add :participators, {:array, :integer}

      timestamps()
    end

  end
end
