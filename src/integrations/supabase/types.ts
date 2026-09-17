export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_articles: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          excerpt: string
          id: string
          image: string
          is_published: boolean
          published_at: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string
          category: string
          content: string
          created_at?: string
          excerpt: string
          id?: string
          image: string
          is_published?: boolean
          published_at?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          image?: string
          is_published?: boolean
          published_at?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      chat_contacts: {
        Row: {
          airtable_synced: boolean | null
          conversation: Json | null
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          phone: string | null
          segment: string | null
          session_id: string | null
        }
        Insert: {
          airtable_synced?: boolean | null
          conversation?: Json | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          segment?: string | null
          session_id?: string | null
        }
        Update: {
          airtable_synced?: boolean | null
          conversation?: Json | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          segment?: string | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_contacts_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["session_id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string | null
          id: string
          lead_type: string | null
          messages: Json
          session_id: string
          updated_at: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          lead_type?: string | null
          messages?: Json
          session_id: string
          updated_at?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          lead_type?: string | null
          messages?: Json
          session_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      chatbot_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          processed: boolean | null
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          processed?: boolean | null
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          processed?: boolean | null
          role?: string
          session_id?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          country: string
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          type: string
        }
        Insert: {
          country: string
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          type: string
        }
        Update: {
          country?: string
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          type?: string
        }
        Relationships: []
      }
      deliverables: {
        Row: {
          ai_feedback: string | null
          ai_status: Database["public"]["Enums"]["ai_status"]
          engagement_id: string
          id: string
          image_url: string
          submitted_at: string | null
          validated_at: string | null
        }
        Insert: {
          ai_feedback?: string | null
          ai_status?: Database["public"]["Enums"]["ai_status"]
          engagement_id: string
          id?: string
          image_url: string
          submitted_at?: string | null
          validated_at?: string | null
        }
        Update: {
          ai_feedback?: string | null
          ai_status?: Database["public"]["Enums"]["ai_status"]
          engagement_id?: string
          id?: string
          image_url?: string
          submitted_at?: string | null
          validated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deliverables_engagement_id_fkey"
            columns: ["engagement_id"]
            isOneToOne: false
            referencedRelation: "engagements"
            referencedColumns: ["id"]
          },
        ]
      }
      engagements: {
        Row: {
          created_at: string | null
          deadline: string
          deliverable_hint: string | null
          description: string | null
          group_id: string
          id: string
          status: Database["public"]["Enums"]["engagement_status"]
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          deadline: string
          deliverable_hint?: string | null
          description?: string | null
          group_id: string
          id?: string
          status?: Database["public"]["Enums"]["engagement_status"]
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          deadline?: string
          deliverable_hint?: string | null
          description?: string | null
          group_id?: string
          id?: string
          status?: Database["public"]["Enums"]["engagement_status"]
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "engagements_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: string
          id: string
          joined_at: string | null
          role: Database["public"]["Enums"]["member_role"]
          user_id: string
        }
        Insert: {
          group_id: string
          id?: string
          joined_at?: string | null
          role?: Database["public"]["Enums"]["member_role"]
          user_id: string
        }
        Update: {
          group_id?: string
          id?: string
          joined_at?: string | null
          role?: Database["public"]["Enums"]["member_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      live_event_secrets: {
        Row: {
          admin_code_hash: string
          created_at: string
          event_id: string
        }
        Insert: {
          admin_code_hash: string
          created_at?: string
          event_id: string
        }
        Update: {
          admin_code_hash?: string
          created_at?: string
          event_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_event_secrets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: true
            referencedRelation: "live_events"
            referencedColumns: ["id"]
          },
        ]
      }
      live_events: {
        Row: {
          created_at: string
          id: string
          public_code: string
          screen_items: string[]
          status: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          public_code: string
          screen_items?: string[]
          status?: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          public_code?: string
          screen_items?: string[]
          status?: string
          title?: string
        }
        Relationships: []
      }
      live_item_notes: {
        Row: {
          item_id: string
          note: string
          updated_at: string
        }
        Insert: {
          item_id: string
          note: string
          updated_at?: string
        }
        Update: {
          item_id?: string
          note?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_item_notes_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: true
            referencedRelation: "live_items"
            referencedColumns: ["id"]
          },
        ]
      }
      live_items: {
        Row: {
          activated_at: string | null
          closed_at: string | null
          created_at: string
          duration_seconds: number | null
          event_id: string
          id: string
          kind: string
          options: string[]
          position: number
          prompt: string
          show_authors: boolean
          status: string
        }
        Insert: {
          activated_at?: string | null
          closed_at?: string | null
          created_at?: string
          duration_seconds?: number | null
          event_id: string
          id?: string
          kind: string
          options?: string[]
          position?: number
          prompt: string
          show_authors?: boolean
          status?: string
        }
        Update: {
          activated_at?: string | null
          closed_at?: string | null
          created_at?: string
          duration_seconds?: number | null
          event_id?: string
          id?: string
          kind?: string
          options?: string[]
          position?: number
          prompt?: string
          show_authors?: boolean
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_items_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "live_events"
            referencedColumns: ["id"]
          },
        ]
      }
      live_likes: {
        Row: {
          created_at: string
          message_id: string
          participant_id: string
        }
        Insert: {
          created_at?: string
          message_id: string
          participant_id: string
        }
        Update: {
          created_at?: string
          message_id?: string
          participant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_likes_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "live_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_likes_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "live_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      live_messages: {
        Row: {
          anonymous: boolean
          author_emoji: string
          author_name: string
          body: string
          created_at: string
          hidden: boolean
          id: string
          item_id: string
          like_count: number
          participant_id: string
        }
        Insert: {
          anonymous?: boolean
          author_emoji: string
          author_name: string
          body: string
          created_at?: string
          hidden?: boolean
          id?: string
          item_id: string
          like_count?: number
          participant_id: string
        }
        Update: {
          anonymous?: boolean
          author_emoji?: string
          author_name?: string
          body?: string
          created_at?: string
          hidden?: boolean
          id?: string
          item_id?: string
          like_count?: number
          participant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_messages_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "live_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_messages_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "live_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      live_participants: {
        Row: {
          created_at: string
          emoji: string
          event_id: string
          first_name: string
          id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          event_id: string
          first_name: string
          id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          event_id?: string
          first_name?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_participants_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "live_events"
            referencedColumns: ["id"]
          },
        ]
      }
      live_votes: {
        Row: {
          created_at: string
          id: string
          item_id: string
          option_index: number
          participant_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          option_index: number
          participant_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          option_index?: number
          participant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_votes_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "live_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_votes_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "live_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      livre_blanc_submissions: {
        Row: {
          country: string
          created_at: string
          email: string
          id: string
          name: string
          organization: string
          phone: string | null
          position: string
          school_type: string
        }
        Insert: {
          country: string
          created_at?: string
          email: string
          id?: string
          name: string
          organization: string
          phone?: string | null
          position: string
          school_type: string
        }
        Update: {
          country?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          organization?: string
          phone?: string | null
          position?: string
          school_type?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          name: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      seo_cron_log: {
        Row: {
          article_id: string | null
          article_slug: string | null
          article_title: string | null
          error_message: string | null
          id: string
          indexnow_status: string | null
          keyword_cluster: string | null
          pillar: string | null
          ran_at: string | null
          status: string
          word_count: number | null
        }
        Insert: {
          article_id?: string | null
          article_slug?: string | null
          article_title?: string | null
          error_message?: string | null
          id?: string
          indexnow_status?: string | null
          keyword_cluster?: string | null
          pillar?: string | null
          ran_at?: string | null
          status?: string
          word_count?: number | null
        }
        Update: {
          article_id?: string | null
          article_slug?: string | null
          article_title?: string | null
          error_message?: string | null
          id?: string
          indexnow_status?: string | null
          keyword_cluster?: string | null
          pillar?: string | null
          ran_at?: string | null
          status?: string
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "seo_cron_log_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "blog_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      is_member_of: { Args: { p_group_id: string }; Returns: boolean }
    }
    Enums: {
      ai_status: "pending" | "validated" | "rejected"
      app_role: "admin" | "user"
      engagement_status: "active" | "submitted" | "validated" | "rejected"
      member_role: "admin" | "member"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ai_status: ["pending", "validated", "rejected"],
      app_role: ["admin", "user"],
      engagement_status: ["active", "submitted", "validated", "rejected"],
      member_role: ["admin", "member"],
    },
  },
} as const
