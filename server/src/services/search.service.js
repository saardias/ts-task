const axios = require('axios');
const uuid = require('uuid');
const fs = require("fs");
const path = require("path");

const url = 'http://api.duckduckgo.com/?format=json';
const filePath = "../assets/files/history.json";


const organizeResults = (results) => {
    const resultList = [];
    for (let result of results) {
        const current = {};
        if (result.FirstURL && result.Text) {
            current.url = result.FirstURL;
            current.title = result.Text;
            resultList.push({
                url: result.FirstURL,
                title: result.Text
            })
        }
        if (result.Topics) {
            for (let topic of result.Topics) {
                if (topic.FirstURL && topic.Text) {
                    resultList.push({
                        url: topic.FirstURL,
                        title: topic.Text
                    })
                }
            }
        }
    }
    return resultList;
};

export const getSearchResults = async (req, res) => {
    try {
        console.log(`sending requrst to search api by - ${JSON.stringify(req.query)}`)
        const query = req.query;
        const { text, page, limit } = query;

        const response = await axios.get(`${url}&q=${text}`);
        const results = response.data.RelatedTopics;

        let resultList = organizeResults(results);

        const total = resultList.length;
        const skip = (page - 1) * limit;
        resultList = resultList.slice(skip, skip + limit);

        console.log(`Total results found: ${total}`);
        res.status(200).send({
            results: resultList,
            metadata: {
                total,
                page
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');

    }
}

export const getRecordSearchResults = async (req, res) => {
    try {
        console.log(`sending requrst to record search api by - ${JSON.stringify(req.body)}`)
        const body = req.body;
        const { text, page, limit } = body;

        const response = await axios.get(`${url}&q=${text}`);
        const results = response.data.RelatedTopics;

        let resultList = organizeResults(results);

        const total = resultList.length;
        const skip = (page - 1) * limit;
        resultList = resultList.slice(skip, skip + limit);
        console.log(`Total results found: ${total}`);
        const SaveTohistoryRes = saveHistoryRecord(text);
        if (SaveTohistoryRes.error) {
            console.log(`Failed to keep record of query`)
        }
        res.status(200).send({
            results: resultList,
            metadata: {
                total,
                page
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');

    }
}

const saveHistoryRecord = (text) => {
    try {
        console.log(`Saving query - ${text} to history`);
        const file = fs.readFileSync(path.resolve(__dirname, filePath));
        let historyJson = JSON.parse(file);
        historyJson.history.push({
            query: text,
            id: uuid.v4()
        })

        let historyToSave = JSON.stringify({
            history: historyJson.history
        });
        fs.writeFileSync(path.resolve(__dirname, filePath), historyToSave);

        return {
            ok: 1
        }
    } catch (error) {
        console.log(error.message)
        return { error };
    }
}

export const getHistory = async (req, res) => {
    try {
        console.log(`getting history from local file }`)

        const file = fs.readFileSync(path.resolve(__dirname, filePath));
        let historyJson = JSON.parse(file);

        console.log(`Number of records found - ${historyJson.history.length}`)
        res.status(200).send({
            history: historyJson.history.reverse(),
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');

    }
}