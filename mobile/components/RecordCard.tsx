import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Record = {
    id: number
    title: string
    amount: number
    createdAt: string
}

const RecordCard = ({record}: {record: Record}) => {

    return (
        <View className='bg-white rounded-xl p-4 mt-3 shadow-sm'>
            <View className='flex-row justify-between items-center'>
                <Text className='text-lg font-semibold text-gray-800 flex-1'>{record.title}</Text>
                <Text className={`text-xl font-bold ${record.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {record.amount.toFixed(2)}
                </Text>
            </View>

        </View>
    )
}

export default RecordCard

const styles = StyleSheet.create({})