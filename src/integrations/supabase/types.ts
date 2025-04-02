export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_matching_settings: {
        Row: {
          additional_context: string | null
          created_at: string
          id: string
          is_enabled: boolean
          precision_level: number
          tenant_id: string
          updated_at: string
        }
        Insert: {
          additional_context?: string | null
          created_at?: string
          id?: string
          is_enabled?: boolean
          precision_level?: number
          tenant_id: string
          updated_at?: string
        }
        Update: {
          additional_context?: string | null
          created_at?: string
          id?: string
          is_enabled?: boolean
          precision_level?: number
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_matching_settings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_provider_matches: {
        Row: {
          confidence_score: number
          created_at: string
          id: string
          is_approved: boolean | null
          provider_id: string
          reasoning: string | null
          request_id: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          confidence_score: number
          created_at?: string
          id?: string
          is_approved?: boolean | null
          provider_id: string
          reasoning?: string | null
          request_id: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          confidence_score?: number
          created_at?: string
          id?: string
          is_approved?: boolean | null
          provider_id?: string
          reasoning?: string | null
          request_id?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_provider_matches_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_provider_matches_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics: {
        Row: {
          created_at: string
          date: string
          id: string
          tenant_id: string
          total_buyers: number
          total_completed_requests: number
          total_pending_requests: number | null
          total_providers: number
          total_requests: number
          total_revenue: number
          total_services: number
          total_users: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          tenant_id: string
          total_buyers?: number
          total_completed_requests?: number
          total_pending_requests?: number | null
          total_providers?: number
          total_requests?: number
          total_revenue?: number
          total_services?: number
          total_users?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          tenant_id?: string
          total_buyers?: number
          total_completed_requests?: number
          total_pending_requests?: number | null
          total_providers?: number
          total_requests?: number
          total_revenue?: number
          total_services?: number
          total_users?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "analytics_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      category_form_mappings: {
        Row: {
          category_id: string
          created_at: string
          form_id: string
          id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          form_id: string
          id?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          form_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_form_mappings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_form_mappings_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "profile_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      form_questions: {
        Row: {
          created_at: string
          form_id: string
          id: string
          is_required: boolean | null
          options: Json | null
          order_index: number
          question: string
          question_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          form_id: string
          id?: string
          is_required?: boolean | null
          options?: Json | null
          order_index: number
          question: string
          question_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          form_id?: string
          id?: string
          is_required?: boolean | null
          options?: Json | null
          order_index?: number
          question?: string
          question_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_questions_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "profile_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      guest_users: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          tenant_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          tenant_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "guest_users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          created_at: string
          credentials: Json
          id: string
          is_active: boolean
          tenant_id: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          credentials?: Json
          id?: string
          is_active?: boolean
          tenant_id: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          credentials?: Json
          id?: string
          is_active?: boolean
          tenant_id?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "integrations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_templates: {
        Row: {
          category: string | null
          created_at: string
          default_colors: Json
          default_hero: Json
          description: string | null
          features: Json
          id: string
          name: string
          preview_image_url: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          default_colors?: Json
          default_hero?: Json
          description?: string | null
          features?: Json
          id?: string
          name: string
          preview_image_url?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          default_colors?: Json
          default_hero?: Json
          description?: string | null
          features?: Json
          id?: string
          name?: string
          preview_image_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      marketplace_users: {
        Row: {
          auth_id: string | null
          avatar_url: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          is_verified: boolean
          last_name: string | null
          location: string | null
          phone: string | null
          role: string
          status: string
          tenant_id: string
          updated_at: string
          verification_code: string | null
        }
        Insert: {
          auth_id?: string | null
          avatar_url?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          is_verified?: boolean
          last_name?: string | null
          location?: string | null
          phone?: string | null
          role: string
          status?: string
          tenant_id: string
          updated_at?: string
          verification_code?: string | null
        }
        Update: {
          auth_id?: string | null
          avatar_url?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          is_verified?: boolean
          last_name?: string | null
          location?: string | null
          phone?: string | null
          role?: string
          status?: string
          tenant_id?: string
          updated_at?: string
          verification_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean
          receiver_id: string
          sender_id: string
          service_request_id: string | null
          source: string
          tenant_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean
          receiver_id: string
          sender_id: string
          service_request_id?: string | null
          source?: string
          tenant_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean
          receiver_id?: string
          sender_id?: string
          service_request_id?: string | null
          source?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "marketplace_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "marketplace_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_service_request_id_fkey"
            columns: ["service_request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          amount: number
          completed_at: string | null
          created_at: string
          details: Json
          id: string
          provider: string
          status: string
          tenant_id: string
          transaction_ref: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          completed_at?: string | null
          created_at?: string
          details?: Json
          id?: string
          provider: string
          status?: string
          tenant_id: string
          transaction_ref: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          completed_at?: string | null
          created_at?: string
          details?: Json
          id?: string
          provider?: string
          status?: string
          tenant_id?: string
          transaction_ref?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_forms: {
        Row: {
          created_at: string
          description: string | null
          id: string
          tenant_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          tenant_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          tenant_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_forms_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_responses: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          question_id: string
          response: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id: string
          question_id: string
          response?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          question_id?: string
          response?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_responses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "provider_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "form_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      provider_profiles: {
        Row: {
          category_id: string
          created_at: string
          form_id: string
          id: string
          provider_id: string
          status: string
          submitted_at: string | null
          updated_at: string
        }
        Insert: {
          category_id: string
          created_at?: string
          form_id: string
          id?: string
          provider_id: string
          status?: string
          submitted_at?: string | null
          updated_at?: string
        }
        Update: {
          category_id?: string
          created_at?: string
          form_id?: string
          id?: string
          provider_id?: string
          status?: string
          submitted_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_profiles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_profiles_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "profile_forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_profiles_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "marketplace_users"
            referencedColumns: ["id"]
          },
        ]
      }
      request_notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          receiver_id: string
          request_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          receiver_id: string
          request_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          receiver_id?: string
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "request_notifications_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          created_at: string
          id: string
          permission: string
          role: string
        }
        Insert: {
          created_at?: string
          id?: string
          permission: string
          role: string
        }
        Update: {
          created_at?: string
          id?: string
          permission?: string
          role?: string
        }
        Relationships: []
      }
      service_categories: {
        Row: {
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          name: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          name: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          name?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_categories_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      service_providers: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          is_new: boolean | null
          provider_id: string
          service_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          is_new?: boolean | null
          provider_id: string
          service_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          is_new?: boolean | null
          provider_id?: string
          service_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_providers_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "marketplace_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_providers_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_request_form_fields: {
        Row: {
          created_at: string
          field_type: string
          form_id: string
          id: string
          is_required: boolean
          label: string
          options: string[] | null
          order_index: number
          placeholder: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          field_type: string
          form_id: string
          id?: string
          is_required?: boolean
          label: string
          options?: string[] | null
          order_index: number
          placeholder?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          field_type?: string
          form_id?: string
          id?: string
          is_required?: boolean
          label?: string
          options?: string[] | null
          order_index?: number
          placeholder?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_request_form_fields_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "service_request_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      service_request_forms: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          service_id: string | null
          tenant_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          service_id?: string | null
          tenant_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          service_id?: string | null
          tenant_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_request_forms_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_request_forms_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      service_requests: {
        Row: {
          attachments: Json | null
          budget: number | null
          buyer_id: string | null
          created_at: string
          description: string
          details: Json
          guest_id: string | null
          id: string
          is_guest_request: boolean | null
          location: string | null
          preferred_date: string | null
          price: number | null
          provider_id: string | null
          service_id: string | null
          special_instructions: string | null
          status: string
          tenant_id: string
          title: string
          updated_at: string
          urgency: string
        }
        Insert: {
          attachments?: Json | null
          budget?: number | null
          buyer_id?: string | null
          created_at?: string
          description: string
          details?: Json
          guest_id?: string | null
          id?: string
          is_guest_request?: boolean | null
          location?: string | null
          preferred_date?: string | null
          price?: number | null
          provider_id?: string | null
          service_id?: string | null
          special_instructions?: string | null
          status?: string
          tenant_id: string
          title: string
          updated_at?: string
          urgency: string
        }
        Update: {
          attachments?: Json | null
          budget?: number | null
          buyer_id?: string | null
          created_at?: string
          description?: string
          details?: Json
          guest_id?: string | null
          id?: string
          is_guest_request?: boolean | null
          location?: string | null
          preferred_date?: string | null
          price?: number | null
          provider_id?: string | null
          service_id?: string | null
          special_instructions?: string | null
          status?: string
          tenant_id?: string
          title?: string
          updated_at?: string
          urgency?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "marketplace_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guest_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "marketplace_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      service_templates: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          required_fields: Json
          tenant_id: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          required_fields?: Json
          tenant_id: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          required_fields?: Json
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_templates_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          duration: number | null
          fields: Json
          id: string
          is_active: boolean | null
          name: string
          price: number | null
          price_type: string | null
          template_id: string | null
          tenant_id: string
          updated_at: string
          visibility: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration?: number | null
          fields?: Json
          id?: string
          is_active?: boolean | null
          name: string
          price?: number | null
          price_type?: string | null
          template_id?: string | null
          tenant_id: string
          updated_at?: string
          visibility?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          duration?: number | null
          fields?: Json
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number | null
          price_type?: string | null
          template_id?: string | null
          tenant_id?: string
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "service_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          end_date: string
          id: string
          payment_id: string | null
          payment_method: string | null
          plan: string
          price: number
          start_date: string
          status: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          payment_id?: string | null
          payment_method?: string | null
          plan: string
          price: number
          start_date: string
          status?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          payment_id?: string | null
          payment_method?: string | null
          plan?: string
          price?: number
          start_date?: string
          status?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_payment_methods: {
        Row: {
          config: Json
          created_at: string
          id: string
          is_enabled: boolean
          provider: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          id?: string
          is_enabled?: boolean
          provider: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          id?: string
          is_enabled?: boolean
          provider?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_payment_methods_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_team_members: {
        Row: {
          created_at: string
          created_by: string | null
          email: string
          id: string
          invite_accepted: boolean
          invite_expires_at: string | null
          invite_token: string
          role: string
          tenant_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          email: string
          id?: string
          invite_accepted?: boolean
          invite_expires_at?: string | null
          invite_token?: string
          role: string
          tenant_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          email?: string
          id?: string
          invite_accepted?: boolean
          invite_expires_at?: string | null
          invite_token?: string
          role?: string
          tenant_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_team_members_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          company_name: string
          created_at: string
          currency: string | null
          custom_domain: string | null
          description: string | null
          font_family: string | null
          hero_customizations: Json | null
          id: string
          industry: string | null
          is_payment_overdue: boolean
          location: string | null
          logo_url: string | null
          primary_color: string | null
          secondary_color: string | null
          status: string
          subdomain: string
          subscription_end_date: string
          subscription_plan: string
          subscription_start_date: string
          telegram_integration: boolean
          template_customizations: Json | null
          template_id: string | null
          updated_at: string
          user_id: string
          username: string | null
          whatsapp_integration: boolean
        }
        Insert: {
          company_name: string
          created_at?: string
          currency?: string | null
          custom_domain?: string | null
          description?: string | null
          font_family?: string | null
          hero_customizations?: Json | null
          id?: string
          industry?: string | null
          is_payment_overdue?: boolean
          location?: string | null
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          status?: string
          subdomain: string
          subscription_end_date?: string
          subscription_plan?: string
          subscription_start_date?: string
          telegram_integration?: boolean
          template_customizations?: Json | null
          template_id?: string | null
          updated_at?: string
          user_id: string
          username?: string | null
          whatsapp_integration?: boolean
        }
        Update: {
          company_name?: string
          created_at?: string
          currency?: string | null
          custom_domain?: string | null
          description?: string | null
          font_family?: string | null
          hero_customizations?: Json | null
          id?: string
          industry?: string | null
          is_payment_overdue?: boolean
          location?: string | null
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          status?: string
          subdomain?: string
          subscription_end_date?: string
          subscription_plan?: string
          subscription_start_date?: string
          telegram_integration?: boolean
          template_customizations?: Json | null
          template_id?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
          whatsapp_integration?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "tenants_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "marketplace_templates"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_manage_services: {
        Args: {
          tenant_id_param: string
        }
        Returns: boolean
      }
      check_tenant_member_access: {
        Args: {
          tenant_uuid: string
        }
        Returns: boolean
      }
      check_tenant_membership: {
        Args: {
          tenant_uuid: string
        }
        Returns: boolean
      }
      check_tenant_ownership: {
        Args: {
          tenant_uuid: string
        }
        Returns: boolean
      }
      create_guest_request: {
        Args: {
          guest_data: Json
          request_data: Json
        }
        Returns: string
      }
      create_tenant_for_user: {
        Args: {
          user_id_param: string
          company_name_param: string
          subdomain_param: string
          username_param?: string
        }
        Returns: string
      }
      get_user_tenant_ids: {
        Args: Record<PropertyKey, never>
        Returns: {
          tenant_id: string
        }[]
      }
      has_tenant_access: {
        Args: {
          tenant_uuid: string
          minimum_role: string
        }
        Returns: boolean
      }
      has_tenant_role: {
        Args: {
          tenant_uuid: string
          requested_role: string
        }
        Returns: boolean
      }
      is_tenant_owner: {
        Args: {
          tenant_uuid: string
        }
        Returns: boolean
      }
      user_tenant_access: {
        Args: {
          tenant_uuid: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
