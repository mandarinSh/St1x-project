defmodule StixServer.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :subject_id, :integer
      add :message_body, :text
      add :sender_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:messages, [:sender_id])
  end
end
