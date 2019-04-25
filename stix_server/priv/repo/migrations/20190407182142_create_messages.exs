defmodule StixServer.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :message_body, :text
      add :dialogue_id, references(:dialogues, on_delete: :nothing)
      add :sender_id, references(:users, on_delete: :nothing)
      add :receiver_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:messages, [:dialogue_id])
    create index(:messages, [:sender_id])
    create index(:messages, [:receiver_id])
  end
end
