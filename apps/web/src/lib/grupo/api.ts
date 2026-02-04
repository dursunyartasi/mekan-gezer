// lib/grupo/api.ts
// Grupo Pro API Integration

import axios, { AxiosInstance } from 'axios';

export interface GrupoUser {
  user_id?: number;
  username: string;
  email: string;
  password: string;
  full_name?: string;
  avatar?: string;
}

export interface GrupoRoom {
  room_id?: number;
  name: string;
  type: 'public' | 'private' | 'city' | 'district' | 'neighborhood';
  description?: string;
  auto_join?: boolean;
  password?: string;
}

export interface GrupoGroup {
  group_id?: number;
  name: string;
  description?: string;
  type: 'public' | 'private';
  auto_delete_after?: number; // days
}

export interface SSOToken {
  token: string;
  expires_at: number;
  user_id: number;
}

class GrupoProAPI {
  private client: AxiosInstance;
  private apiUrl: string;
  private apiKey: string;
  private ssoSecret: string;

  constructor() {
    this.apiUrl = process.env.GRUPO_PRO_API_URL || 'http://localhost:8080/api';
    this.apiKey = process.env.GRUPO_PRO_API_KEY || '';
    this.ssoSecret = process.env.GRUPO_PRO_SSO_SECRET || '';

    this.client = axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      timeout: 10000,
    });
  }

  // ============================================
  // USER MANAGEMENT
  // ============================================

  /**
   * Create a new user in Grupo Pro
   * Called when user registers in Mekan Gezer
   */
  async createUser(userData: GrupoUser): Promise<{ success: boolean; user_id?: number; error?: string }> {
    try {
      const response = await this.client.post('/users/create', userData);
      return {
        success: true,
        user_id: response.data.user_id,
      };
    } catch (error: any) {
      console.error('Grupo API - Create User Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create user',
      };
    }
  }

  /**
   * Update existing user
   */
  async updateUser(userId: number, updates: Partial<GrupoUser>): Promise<{ success: boolean; error?: string }> {
    try {
      await this.client.put(`/users/${userId}`, updates);
      return { success: true };
    } catch (error: any) {
      console.error('Grupo API - Update User Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update user',
      };
    }
  }

  /**
   * Delete user
   */
  async deleteUser(userId: number): Promise<{ success: boolean; error?: string }> {
    try {
      await this.client.delete(`/users/${userId}`);
      return { success: true };
    } catch (error: any) {
      console.error('Grupo API - Delete User Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete user',
      };
    }
  }

  // ============================================
  // ROOM MANAGEMENT (Şehir/Semt Odaları)
  // ============================================

  /**
   * Create a new room (for cities, districts, neighborhoods)
   */
  async createRoom(roomData: GrupoRoom): Promise<{ success: boolean; room_id?: number; error?: string }> {
    try {
      const response = await this.client.post('/rooms/create', roomData);
      return {
        success: true,
        room_id: response.data.room_id,
      };
    } catch (error: any) {
      console.error('Grupo API - Create Room Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create room',
      };
    }
  }

  /**
   * Add user to a room
   */
  async addUserToRoom(userId: number, roomId: number): Promise<{ success: boolean; error?: string }> {
    try {
      await this.client.post('/rooms/add-user', {
        user_id: userId,
        room_id: roomId,
      });
      return { success: true };
    } catch (error: any) {
      console.error('Grupo API - Add User to Room Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to add user to room',
      };
    }
  }

  /**
   * Remove user from room
   */
  async removeUserFromRoom(userId: number, roomId: number): Promise<{ success: boolean; error?: string }> {
    try {
      await this.client.post('/rooms/remove-user', {
        user_id: userId,
        room_id: roomId,
      });
      return { success: true };
    } catch (error: any) {
      console.error('Grupo API - Remove User from Room Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to remove user from room',
      };
    }
  }

  // ============================================
  // GROUP MANAGEMENT (Etkinlik Grupları)
  // ============================================

  /**
   * Create a new group (for events)
   */
  async createGroup(groupData: GrupoGroup): Promise<{ success: boolean; group_id?: number; error?: string }> {
    try {
      const response = await this.client.post('/groups/create', groupData);
      return {
        success: true,
        group_id: response.data.group_id,
      };
    } catch (error: any) {
      console.error('Grupo API - Create Group Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create group',
      };
    }
  }

  /**
   * Add user to group
   */
  async addUserToGroup(userId: number, groupId: number, isAdmin: boolean = false): Promise<{ success: boolean; error?: string }> {
    try {
      await this.client.post('/groups/add-user', {
        user_id: userId,
        group_id: groupId,
        is_admin: isAdmin,
      });
      return { success: true };
    } catch (error: any) {
      console.error('Grupo API - Add User to Group Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to add user to group',
      };
    }
  }

  /**
   * Remove user from group
   */
  async removeUserFromGroup(userId: number, groupId: number): Promise<{ success: boolean; error?: string }> {
    try {
      await this.client.post('/groups/remove-user', {
        user_id: userId,
        group_id: groupId,
      });
      return { success: true };
    } catch (error: any) {
      console.error('Grupo API - Remove User from Group Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to remove user from group',
      };
    }
  }

  /**
   * Delete group (when event is deleted)
   */
  async deleteGroup(groupId: number): Promise<{ success: boolean; error?: string }> {
    try {
      await this.client.delete(`/groups/${groupId}`);
      return { success: true };
    } catch (error: any) {
      console.error('Grupo API - Delete Group Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete group',
      };
    }
  }

  // ============================================
  // SSO (Single Sign-On)
  // ============================================

  /**
   * Generate SSO token for seamless login
   */
  generateSSOToken(userId: number, grupoUserId: number): SSOToken {
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    
    // Simple token generation (in production, use JWT or similar)
    const payload = {
      user_id: userId,
      grupo_user_id: grupoUserId,
      expires_at: expiresAt,
    };

    // In production, sign this with JWT
    const token = Buffer.from(JSON.stringify(payload)).toString('base64');

    return {
      token,
      expires_at: expiresAt,
      user_id: grupoUserId,
    };
  }

  /**
   * Verify SSO token
   */
  verifySSOToken(token: string): { valid: boolean; userId?: number; error?: string } {
    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
      
      if (decoded.expires_at < Date.now()) {
        return { valid: false, error: 'Token expired' };
      }

      return {
        valid: true,
        userId: decoded.grupo_user_id,
      };
    } catch (error) {
      return { valid: false, error: 'Invalid token' };
    }
  }

  // ============================================
  // MESSAGING
  // ============================================

  /**
   * Send a message to a room or group
   */
  async sendMessage(params: {
    userId: number;
    roomId?: number;
    groupId?: number;
    message: string;
  }): Promise<{ success: boolean; message_id?: number; error?: string }> {
    try {
      const response = await this.client.post('/messages/send', params);
      return {
        success: true,
        message_id: response.data.message_id,
      };
    } catch (error: any) {
      console.error('Grupo API - Send Message Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to send message',
      };
    }
  }

  /**
   * Delete a message (moderation)
   */
  async deleteMessage(messageId: number): Promise<{ success: boolean; error?: string }> {
    try {
      await this.client.delete(`/messages/${messageId}`);
      return { success: true };
    } catch (error: any) {
      console.error('Grupo API - Delete Message Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete message',
      };
    }
  }
}

// Singleton instance
export const grupoAPI = new GrupoProAPI();

export default grupoAPI;
