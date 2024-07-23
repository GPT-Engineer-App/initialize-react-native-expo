import { supabase } from '../lib/supabase'

export const createTrainingData = async (data) => {
  const { data: createdData, error } = await supabase
    .from('training_data')
    .insert({ data })
    .single()

  if (error) throw error
  return createdData
}

export const getAllTrainingData = async () => {
  const { data, error } = await supabase
    .from('training_data')
    .select('*')

  if (error) throw error
  return data
}

export const getTrainingDataById = async (id) => {
  const { data, error } = await supabase
    .from('training_data')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const updateTrainingData = async (id, data) => {
  const { data: updatedData, error } = await supabase
    .from('training_data')
    .update({ data })
    .eq('id', id)
    .single()

  if (error) throw error
  return updatedData
}

export const deleteTrainingData = async (id) => {
  const { error } = await supabase
    .from('training_data')
    .delete()
    .eq('id', id)

  if (error) throw error
}