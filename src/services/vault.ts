import { supabase } from './supabase';
import type { 
  DigitalAccount, 
  CryptoWallet, 
  Document, 
  PersonalMessage, 
  Beneficiary, 
  TriggerConfig 
} from '../types';

// Generic error response
interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// =====================================================
// DIGITAL ACCOUNTS
// =====================================================

export async function getDigitalAccounts(userId: string): Promise<ServiceResponse<DigitalAccount[]>> {
  try {
    const { data, error } = await supabase
      .from('digital_accounts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error fetching digital accounts:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function createDigitalAccount(
  userId: string,
  account: Omit<DigitalAccount, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<ServiceResponse<DigitalAccount>> {
  try {
    const { data, error } = await supabase
      .from('digital_accounts')
      .insert({ ...account, user_id: userId })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating digital account:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateDigitalAccount(
  id: string,
  updates: Partial<DigitalAccount>
): Promise<ServiceResponse<DigitalAccount>> {
  try {
    const { data, error } = await supabase
      .from('digital_accounts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating digital account:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteDigitalAccount(id: string): Promise<ServiceResponse<void>> {
  try {
    const { error } = await supabase
      .from('digital_accounts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting digital account:', error);
    return { success: false, error: (error as Error).message };
  }
}

// =====================================================
// CRYPTO WALLETS
// =====================================================

export async function getCryptoWallets(userId: string): Promise<ServiceResponse<CryptoWallet[]>> {
  try {
    const { data, error } = await supabase
      .from('crypto_wallets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error fetching crypto wallets:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function createCryptoWallet(
  userId: string,
  wallet: Omit<CryptoWallet, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<ServiceResponse<CryptoWallet>> {
  try {
    const { data, error } = await supabase
      .from('crypto_wallets')
      .insert({ ...wallet, user_id: userId })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating crypto wallet:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateCryptoWallet(
  id: string,
  updates: Partial<CryptoWallet>
): Promise<ServiceResponse<CryptoWallet>> {
  try {
    const { data, error } = await supabase
      .from('crypto_wallets')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating crypto wallet:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteCryptoWallet(id: string): Promise<ServiceResponse<void>> {
  try {
    const { error } = await supabase
      .from('crypto_wallets')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting crypto wallet:', error);
    return { success: false, error: (error as Error).message };
  }
}

// =====================================================
// DOCUMENTS
// =====================================================

export async function getDocuments(userId: string): Promise<ServiceResponse<Document[]>> {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('uploaded_at', { ascending: false });

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error fetching documents:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function createDocument(
  userId: string,
  document: Omit<Document, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<ServiceResponse<Document>> {
  try {
    const { data, error } = await supabase
      .from('documents')
      .insert({ ...document, user_id: userId })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating document:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateDocument(
  id: string,
  updates: Partial<Document>
): Promise<ServiceResponse<Document>> {
  try {
    const { data, error } = await supabase
      .from('documents')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating document:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteDocument(id: string): Promise<ServiceResponse<void>> {
  try {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting document:', error);
    return { success: false, error: (error as Error).message };
  }
}

// =====================================================
// PERSONAL MESSAGES
// =====================================================

export async function getMessages(userId: string): Promise<ServiceResponse<PersonalMessage[]>> {
  try {
    const { data, error } = await supabase
      .from('personal_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error fetching messages:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function createMessage(
  userId: string,
  message: Omit<PersonalMessage, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<ServiceResponse<PersonalMessage>> {
  try {
    const { data, error } = await supabase
      .from('personal_messages')
      .insert({ ...message, user_id: userId })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating message:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateMessage(
  id: string,
  updates: Partial<PersonalMessage>
): Promise<ServiceResponse<PersonalMessage>> {
  try {
    const { data, error } = await supabase
      .from('personal_messages')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating message:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteMessage(id: string): Promise<ServiceResponse<void>> {
  try {
    const { error } = await supabase
      .from('personal_messages')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting message:', error);
    return { success: false, error: (error as Error).message };
  }
}

// =====================================================
// BENEFICIARIES
// =====================================================

export async function getBeneficiaries(userId: string): Promise<ServiceResponse<Beneficiary[]>> {
  try {
    const { data, error } = await supabase
      .from('beneficiaries')
      .select('*')
      .eq('user_id', userId)
      .order('added_at', { ascending: false });

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error fetching beneficiaries:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function createBeneficiary(
  userId: string,
  beneficiary: Omit<Beneficiary, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<ServiceResponse<Beneficiary>> {
  try {
    const { data, error } = await supabase
      .from('beneficiaries')
      .insert({ ...beneficiary, user_id: userId })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating beneficiary:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateBeneficiary(
  id: string,
  updates: Partial<Beneficiary>
): Promise<ServiceResponse<Beneficiary>> {
  try {
    const { data, error } = await supabase
      .from('beneficiaries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating beneficiary:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteBeneficiary(id: string): Promise<ServiceResponse<void>> {
  try {
    const { error } = await supabase
      .from('beneficiaries')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting beneficiary:', error);
    return { success: false, error: (error as Error).message };
  }
}

// =====================================================
// TRIGGER CONFIG
// =====================================================

export async function getTriggerConfig(userId: string): Promise<ServiceResponse<TriggerConfig>> {
  try {
    const { data, error } = await supabase
      .from('trigger_configs')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching trigger config:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateTriggerConfig(
  userId: string,
  updates: Partial<TriggerConfig>
): Promise<ServiceResponse<TriggerConfig>> {
  try {
    const { data, error } = await supabase
      .from('trigger_configs')
      .upsert({ ...updates, user_id: userId })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating trigger config:', error);
    return { success: false, error: (error as Error).message };
  }
}

// =====================================================
// ACTIVITY LOGGING
// =====================================================

export async function logActivity(
  userId: string,
  action: string,
  details: Record<string, unknown> = {}
): Promise<ServiceResponse<void>> {
  try {
    const { error } = await supabase.rpc('log_activity', {
      user_uuid: userId,
      action_text: action,
      details_json: details,
    });

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error logging activity:', error);
    return { success: false, error: (error as Error).message };
  }
}

