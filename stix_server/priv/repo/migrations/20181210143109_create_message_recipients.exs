defmodule StixServer.Repo.Migrations.CreateMessageRecipients do
  use Ecto.Migration

  def change do
    create table(:message_recipients) do
      add :is_read, :boolean, default: false, null: false
      add :recipient_user_id, references(:users, on_delete: :nothing)
      add :recipient_conversation_id, references(:conversations, on_delete: :nothing)
      add :message_id, references(:messages, on_delete: :nothing)

      timestamps()
    end

    create index(:message_recipients, [:recipient_user_id])
    create index(:message_recipients, [:recipient_conversation_id])
    create index(:message_recipients, [:message_id])
  end
end
