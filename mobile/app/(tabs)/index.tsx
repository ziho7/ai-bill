import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RecordCard from '@/components/RecordCard';
import { create } from 'zustand';
import axios from 'axios';
import { useAuth } from '../_layout';
export const useRecord = create((set) => ({
  records: [],
  fetchRecords: (date: Date, session: any) => {
    if (!session?.user?.id) {
      return
    }

    const headers = {
      'Authorization': `Bearer ${session?.access_token}`
    }

    axios.post(`${process.env.EXPO_PUBLIC_API_URL}/records`, {
      user_id: session?.user?.id,
      date: date.toISOString().split('T')[0] // YYYY-MM-DD
    }, {headers}).then((res) => {
      set({ records: res.data })
    })
  }
}))

export default function HomeScreen() {

  const session = useAuth((state: any) => state.session)

  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const records = useRecord((state: any) => state.records)
  const fetchRecords = useRecord((state: any) => state.fetchRecords)

  useEffect(() => {
    if (session?.user?.id) {
      fetchRecords(date, session)
      // console.log('records', records)
    }
  }, [date])

  return (
    <SafeAreaView className='flex-1 flex gap-4 mx-4'>
      {/* date */}
      <View className='flex flex-row justify-between'>
        <Text className=' font-bold'>{date.toLocaleDateString()}</Text>
        <Pressable onPress={() => setShowDatePicker(true)}>
          <Text className='text-gray-500'>选择日期</Text>
        </Pressable>
      </View>
      {/* date picker */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate)
              setShowDatePicker(false)
            }
          }}
        />
      )}
      {/* income and expense */}
      <View className='h-1/8 flex flex-row justify-between gap-2'>
        <View className='flex-1 bg-green-50 rounded-lg p-4 flex items-center justify-center'>
          <View className='w-full flex flex-row justify-between'>
            <Text className=' font-bold'>收入</Text>
            <Text className=' text-green-500'>
              {records.filter((record: any) => record.amount > 0).reduce((acc: number, record: any) => acc + record.amount, 0)}
            </Text>
          </View>
        </View>
        <View className='flex-1 bg-red-50 rounded-lg p-4 flex items-center justify-center'>
          <View className='w-full flex flex-row justify-between'>
            <Text className=' font-bold'>支出</Text>
            <Text className=' text-red-500'>{
              records.filter((record: any) => record.amount < 0).reduce((acc: number, record: any) => acc + record.amount, 0)
            }</Text>
          </View>
        </View>
      </View>

      {/* 详细记录 */}
      <View className='flex-1 bg-gray-100 rounded-lg py-4 gap-2'>
        <Text className='text-gray-500'>详细记录</Text>
        <ScrollView className='flex-1'>
          {/* <RecordCard record={{
            id: 1,
            title: '收入',
            amount: 1000,
            createdAt: '2025-04-14'
          }} /> */}
          {records.map((record: any) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
