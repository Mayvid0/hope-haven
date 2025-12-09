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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string | null
          excerpt: string
          id: string
          image: string | null
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author: string
          category: string
          content: string
          created_at?: string | null
          excerpt: string
          id?: string
          image?: string | null
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string
          id?: string
          image?: string | null
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          author: string
          blog_post_id: string
          content: string
          created_at: string | null
          id: string
          status: string | null
        }
        Insert: {
          author: string
          blog_post_id: string
          content: string
          created_at?: string | null
          id?: string
          status?: string | null
        }
        Update: {
          author?: string
          blog_post_id?: string
          content?: string
          created_at?: string | null
          id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          capacity: number
          created_at: string | null
          date: string
          description: string
          id: string
          image: string | null
          location: string
          registered: number
          time: string
          title: string
          type: Database["public"]["Enums"]["event_type"]
          updated_at: string | null
        }
        Insert: {
          capacity: number
          created_at?: string | null
          date: string
          description: string
          id?: string
          image?: string | null
          location: string
          registered?: number
          time: string
          title: string
          type: Database["public"]["Enums"]["event_type"]
          updated_at?: string | null
        }
        Update: {
          capacity?: number
          created_at?: string | null
          date?: string
          description?: string
          id?: string
          image?: string | null
          location?: string
          registered?: number
          time?: string
          title?: string
          type?: Database["public"]["Enums"]["event_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          tag: string
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          tag: string
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          tag?: string
          title?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          image: string | null
          status: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          id?: string
          image?: string | null
          status?: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          image?: string | null
          status?: string
          title?: string
        }
        Relationships: []
      }
      rsvps: {
        Row: {
          created_at: string | null
          email: string
          event_id: string
          id: string
          name: string
          phone: string
        }
        Insert: {
          created_at?: string | null
          email: string
          event_id: string
          id?: string
          name: string
          phone: string
        }
        Update: {
          created_at?: string | null
          email?: string
          event_id?: string
          id?: string
          name?: string
          phone?: string
        }
        Relationships: [
          {
            foreignKeyName: "rsvps_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          bio: string
          created_at: string | null
          id: string
          image: string | null
          name: string
          order_index: number | null
          role: string
        }
        Insert: {
          bio: string
          created_at?: string | null
          id?: string
          image?: string | null
          name: string
          order_index?: number | null
          role: string
        }
        Update: {
          bio?: string
          created_at?: string | null
          id?: string
          image?: string | null
          name?: string
          order_index?: number | null
          role?: string
        }
        Relationships: []
      }
      testimonies: {
        Row: {
          cancer_type: string
          category: string
          created_at: string | null
          id: string
          image: string | null
          name: string
          status: string
          story: string
        }
        Insert: {
          cancer_type: string
          category: string
          created_at?: string | null
          id?: string
          image?: string | null
          name: string
          status?: string
          story: string
        }
        Update: {
          cancer_type?: string
          category?: string
          created_at?: string | null
          id?: string
          image?: string | null
          name?: string
          status?: string
          story?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      volunteer_applications: {
        Row: {
          availability: string
          created_at: string | null
          email: string
          experience: string | null
          id: string
          interests: string
          name: string
          phone: string
          status: string | null
        }
        Insert: {
          availability: string
          created_at?: string | null
          email: string
          experience?: string | null
          id?: string
          interests: string
          name: string
          phone: string
          status?: string | null
        }
        Update: {
          availability?: string
          created_at?: string | null
          email?: string
          experience?: string | null
          id?: string
          interests?: string
          name?: string
          phone?: string
          status?: string | null
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
    }
    Enums: {
      app_role: "admin" | "user"
      event_type: "awareness" | "workshop" | "fundraising"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      app_role: ["admin", "user"],
      event_type: ["awareness", "workshop", "fundraising"],
    },
  },
} as const
