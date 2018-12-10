defmodule StixServer.Repo.Migrations.CreateUserConversations do
  use Ecto.Migration

  def change do
    create table(:user_conversations) do
      add :user_id, references(:users, on_delete: :nothing)
      add :conversation_id, references(:conversations, on_delete: :nothing)

      timestamps()
    end

    create index(:user_conversations, [:user_id])
    create index(:user_conversations, [:conversation_id])
  end
end
