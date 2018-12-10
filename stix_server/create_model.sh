#!/bin/sh

# User schema. id, nickname, email password, friends, birthday, status, info, phone_number, id_dialogs

mix phx.gen.schema Schemas.User users nickname email:unique password first_name last_name birthday:date status info phone_number:unique is_active:boolean


# Conversation schema

mix phx.gen.schema Schemas.Conversation conversations title


# Conversation participants schema

mix phx.gen.schema Schemas.UserConversation user_conversations user_id:references:users conversation_id:references:conversations


# Messages schema

mix phx.gen.schema Schemas.Message messages sender_id:references:users subject_id:integer message_body:text


# Recipient schema

mix phx.gen.schema Schemas.MessageRecipient message_recipients recipient_user_id:references:users recipient_conversation_id:references:conversations message_id:references:messages is_read:boolean

