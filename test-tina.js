// Quick test to see if TinaCMS data is accessible
import { client } from './tina/__generated__/client.js';

async function testTina() {
  try {
    console.log('Testing TinaCMS connection...');
    const response = await client.queries.sermonsConnection();
    console.log('TinaCMS Response:', response);
    console.log('Sermons:', response.data.sermonsConnection.edges);
  } catch (error) {
    console.error('TinaCMS Error:', error);
  }
}

testTina();