import { createDeepSeek } from '@ai-sdk/deepseek';
import { generateText, streamText } from 'ai';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { createRecord } from './db';
import { authMiddleware } from './auth.middleware';
dotenv.config();

export const chatRoutes = express.Router();

const deepSeek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY,
});

// YYYY-MM-DD
const today = new Date().toISOString().split('T')[0]

const prompt = `请你分析一下我的输入,如果是消费或者支出记录,则按照json格式返回,不然正常返回。格式如下 : {"amount": 1000, "title": "others", "date": "2024-01-01"}, 规则是: 1.如果是消费,则amount是负数,如果是收入,则amount是正数, 2. 如果是支出,则title是消费的商品或者服务,如果是收入,则title是收入的来源,如果分析不出来,则填others 3.今天是${today},如果能分析出日期,则date是日期,否则为今天`


chatRoutes.post('/', authMiddleware, async (req: Request, res: Response) => {
    const {messages, user_id: userId} = req.body

    let resJson = {
        text: '',
        records: null
    }

    try {

        
        const {text} = await generateText({
            model: deepSeek('deepseek-chat'),
            system: prompt,
            messages: messages
        });

        const record = parseResult(text)
        if (record) {
            // save to db
            await createRecord(userId, record.amount, record.title, record.date)
            resJson.records = record
        } else {
            resJson.text = text
        }
        
        res.status(200).json(resJson)
        return
    } catch (error) {
        console.log(error)
        res.status(500).json(resJson)
        return
    }
})

const parseResult = (result: string) => {
    try {
        // 清理一下可能存在的Markdown格式
        const cleanResult = result.replace(/```json\n/, '').replace(/\n```/, '').trim()
        const parsedResult = JSON.parse(cleanResult)
        if (parsedResult.amount && parsedResult.title && parsedResult.date) {
            return parsedResult
        } else {
            return null
        }
    } catch (error) {
        //  console.log(error)
        return null
    }
}