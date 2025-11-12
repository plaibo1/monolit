export const fakeSocketMessages = [
  [
    {
      type: "agent",
      message: ["task_end", {}],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "update_message",
        {
          createdAt: "2025-11-07T14:27:05.156753Z",
          defaultOpen: false,
          end: "2025-11-07T14:28:15.625366Z",
          generation: null,
          id: "2b5fb463-28e3-4051-8850-d2d109aff0d3",
          input:
            "дай мен любой маркет слаг и все поля из таблицы рынка полимаркет который заканчивается в ближаший месяц",
          isError: false,
          language: null,
          metadata: {},
          name: "on_message",
          output: "",
          parentId: "1c787b43-901d-4d2b-8309-412fc6776ff0",
          showInput: "json",
          start: "2025-11-07T14:27:05.156800Z",
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "run",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "update_message",
        {
          command: null,
          createdAt: "2025-11-07T14:27:05.174252Z",
          end: "2025-11-07T14:27:05.174252Z",
          id: "b5a856b8-403a-4556-bf50-31fa9881ea67",
          isError: false,
          language: null,
          metadata: {},
          name: "DataLayer AI Assistant",
          output:
            '# Polymarket Markets Expiring Within the Next Month\n\nBased on your request, I\'ve found several Polymarket prediction markets that are set to expire within the next month. Below is a detailed breakdown of one market along with its complete table fields:\n\n## Market Details\n\n**Market Slug:** `solana-above-150-on-november-13`\n\n### Complete Market Data\n- **Condition ID:** 0x002ca0fdf942fc05b704d024c201a5605dabd0788208419a8caa5096d1336057\n- **Question ID:** 0x3b5b611f3c11465503f31e915be54a0e54c9024169e1243d29f5ed92a230592a\n- **Tokens:** \n  - ["9458001593611272609329440281441211311614303803364800370525378474814716572182", "Yes"]\n  - ["99612821278226028866453146220607685174266097566969459575001584323950788663291", "No"]\n- **Rewards:** {"rates":null,"min_size":0,"max_spread":0}\n- **Minimum Order Size:** 5\n- **Minimum Tick Size:** 0.01\n- **Description:** This market will resolve to "Yes" if the Binance 1 minute candle for SOL/USDT 12:00 in the ET timezone (noon) on the date specified in the title has a final "Close" price higher than the price specified in the title. Otherwise, this market will resolve to "No". The resolution source for this market is Binance, specifically the SOL/USDT "Close" prices currently available at https://www.binance.com/en/trade/SOL_USDT with "1m" and "Candles" selected on the top bar. Please note that this market is about the price according to Binance SOL/USDT, not according to other sources or spot markets. Price precision is determined by the number of decimal places in the source.\n- **Tags:** ["Solana", "Weekly", "Multi Strikes", "Crypto", "Crypto Prices", "Recurring", "Hide From New"]\n- **End Date ISO:** 2025-11-13T01:00:00\n- **Game Start Time:** 1970-01-01T01:00:00\n- **Question:** Will the price of Solana be above $150 on November 13?\n- **Market Slug:** solana-above-150-on-november-13\n- **Min Incentive Size:** ""\n- **Max Incentive Spread:** ""\n- **Active:** true\n- **Closed:** false\n- **Seconds Delay:** 0\n- **Icon:** https://polymarket-upload.s3.us-east-2.amazonaws.com/SOL-logo.png\n- **FPMM:** ""\n- **Winner:** ""\n- **Archived:** 0\n\n## Other Markets Expiring Soon\n\nHere are some other markets that will expire within the next month:\n\n1. **CMS Oissel vs. US Quevilly-Rouen Métropole Draw** (market_slug: `cde-cms-que-2025-11-15-draw`) - Expires: 2025-11-15\n2. **Lance Stroll Pole Position at F1 Brazilian Grand Prix** (market_slug: `f1-brazilian-grand-prix-driver-pole-position-stroll-2025-11-08`) - Expires: 2025-11-15\n3. **Alaves Win on 2025-11-08** (market_slug: `lal-gir-ala-2025-11-08-ala`) - Expires: 2025-11-08\n4. **VfB Stuttgart vs. FC Augsburg Draw** (market_slug: `bun-stu-aug-2025-11-09-draw`) - Expires: 2025-11-09\n5. **Wilberforce Bulldogs vs. Wright State Raiders (W)** (market_slug: `cwbb-wilb-wrght-2025-11-13`) - Expires: 2025-11-13\n6. **US Granville Win on 2025-11-16** (market_slug: `cde-gra-din-2025-11-16-gra`) - Expires: 2025-11-16\n7. **FIDE World Cup 2025 - Andrey Esipenko vs Pouya Idani** (market_slug: `fide-world-cup-2025-andrey-esipenko-pouya-idani`) - Expires: 2025-11-10\n8. **Bitcoin Above $100,000 on November 11** (market_slug: `bitcoin-above-100k-on-november-11`) - Expires: 2025-11-11\n9. **Blues vs. Islanders NHL Game** (market_slug: `nhl-stl-nyi-2025-11-22`) - Expires: 2025-11-22\n\nThese markets cover various categories including sports (soccer, F1, basketball, hockey), cryptocurrency price predictions, and chess competitions.\n\n## Key Insights and Limitations:\n\n### Key Insights:\n- Most markets expiring soon are sports-related, particularly soccer matches\n- There are two cryptocurrency price prediction markets (Solana and Bitcoin)\n- All markets listed are currently active and not yet closed\n- The markets have various minimum order sizes and tick sizes, with most having a 5 USDC minimum order\n- Several markets have specific resolution criteria detailed in their descriptions\n\n### Limitations:\n- The data only shows markets expiring within approximately the next 30 days\n- Historical performance data for these markets is not included\n- Current market prices and trading volumes are not provided\n- The query was limited to 10 results, so there may be additional markets expiring soon\n- The data doesn\'t show how these markets have performed over time',
          parentId: "2b5fb463-28e3-4051-8850-d2d109aff0d3",
          start: "2025-11-07T14:27:05.174252Z",
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "assistant_message",
          waitForAnswer: false,
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "action",
        {
          forId: "857bf53d-8b23-447c-900b-ed6ac28e007a",
          icon: null,
          id: "6e421edf-c882-44d4-b56e-6cb4c68b7130",
          label:
            "💡 What factors typically influence prediction market prices on Polymarket?",
          name: "follow_up_query",
          payload: {
            query:
              "What factors typically influence prediction market prices on Polymarket?",
          },
          tooltip: "",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "action",
        {
          forId: "857bf53d-8b23-447c-900b-ed6ac28e007a",
          icon: null,
          id: "ad67efd3-39e3-4c4c-ae67-831357032635",
          label:
            "💡 Can you explain how Polymarket's resolution mechanism works?",
          name: "follow_up_query",
          payload: {
            query:
              "Can you explain how Polymarket's resolution mechanism works?",
          },
          tooltip: "",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "action",
        {
          forId: "857bf53d-8b23-447c-900b-ed6ac28e007a",
          icon: null,
          id: "8566145c-5031-445f-87ca-310ededd1a9b",
          label:
            "💡 How accurate have Polymarket predictions been historically?",
          name: "follow_up_query",
          payload: {
            query:
              "How accurate have Polymarket predictions been historically?",
          },
          tooltip: "",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "action",
        {
          forId: "857bf53d-8b23-447c-900b-ed6ac28e007a",
          icon: null,
          id: "62555592-fba7-4e9f-b915-566f44d1f3a3",
          label:
            "💡 What other crypto prediction markets are trending on Polymarket?",
          name: "follow_up_query",
          payload: {
            query:
              "What other crypto prediction markets are trending on Polymarket?",
          },
          tooltip: "",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "action",
        {
          forId: "857bf53d-8b23-447c-900b-ed6ac28e007a",
          icon: null,
          id: "2b8acfc5-f31e-4c92-9845-82ceec1afd74",
          label:
            "💡 How can I track Polymarket prediction outcomes in real-time?",
          name: "follow_up_query",
          payload: {
            query:
              "How can I track Polymarket prediction outcomes in real-time?",
          },
          tooltip: "",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "new_message",
        {
          command: null,
          createdAt: "2025-11-07T14:28:15.605242Z",
          end: "2025-11-07T14:28:15.605242Z",
          id: "857bf53d-8b23-447c-900b-ed6ac28e007a",
          isError: false,
          language: null,
          metadata: {},
          name: "DataLayer",
          output: "**💭 Suggested Follow-up Questions:**",
          parentId: "2b5fb463-28e3-4051-8850-d2d109aff0d3",
          start: "2025-11-07T14:28:15.605242Z",
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "assistant_message",
          waitForAnswer: false,
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "update_message",
        {
          command: null,
          createdAt: "2025-11-07T14:27:05.174252Z",
          end: "2025-11-07T14:27:05.174252Z",
          id: "b5a856b8-403a-4556-bf50-31fa9881ea67",
          isError: false,
          language: null,
          metadata: {},
          name: "DataLayer AI Assistant",
          output:
            '# Polymarket Markets Expiring Within the Next Month\n\nBased on your request, I\'ve found several Polymarket prediction markets that are set to expire within the next month. Below is a detailed breakdown of one market along with its complete table fields:\n\n## Market Details\n\n**Market Slug:** `solana-above-150-on-november-13`\n\n### Complete Market Data\n- **Condition ID:** 0x002ca0fdf942fc05b704d024c201a5605dabd0788208419a8caa5096d1336057\n- **Question ID:** 0x3b5b611f3c11465503f31e915be54a0e54c9024169e1243d29f5ed92a230592a\n- **Tokens:** \n  - ["9458001593611272609329440281441211311614303803364800370525378474814716572182", "Yes"]\n  - ["99612821278226028866453146220607685174266097566969459575001584323950788663291", "No"]\n- **Rewards:** {"rates":null,"min_size":0,"max_spread":0}\n- **Minimum Order Size:** 5\n- **Minimum Tick Size:** 0.01\n- **Description:** This market will resolve to "Yes" if the Binance 1 minute candle for SOL/USDT 12:00 in the ET timezone (noon) on the date specified in the title has a final "Close" price higher than the price specified in the title. Otherwise, this market will resolve to "No". The resolution source for this market is Binance, specifically the SOL/USDT "Close" prices currently available at https://www.binance.com/en/trade/SOL_USDT with "1m" and "Candles" selected on the top bar. Please note that this market is about the price according to Binance SOL/USDT, not according to other sources or spot markets. Price precision is determined by the number of decimal places in the source.\n- **Tags:** ["Solana", "Weekly", "Multi Strikes", "Crypto", "Crypto Prices", "Recurring", "Hide From New"]\n- **End Date ISO:** 2025-11-13T01:00:00\n- **Game Start Time:** 1970-01-01T01:00:00\n- **Question:** Will the price of Solana be above $150 on November 13?\n- **Market Slug:** solana-above-150-on-november-13\n- **Min Incentive Size:** ""\n- **Max Incentive Spread:** ""\n- **Active:** true\n- **Closed:** false\n- **Seconds Delay:** 0\n- **Icon:** https://polymarket-upload.s3.us-east-2.amazonaws.com/SOL-logo.png\n- **FPMM:** ""\n- **Winner:** ""\n- **Archived:** 0\n\n## Other Markets Expiring Soon\n\nHere are some other markets that will expire within the next month:\n\n1. **CMS Oissel vs. US Quevilly-Rouen Métropole Draw** (market_slug: `cde-cms-que-2025-11-15-draw`) - Expires: 2025-11-15\n2. **Lance Stroll Pole Position at F1 Brazilian Grand Prix** (market_slug: `f1-brazilian-grand-prix-driver-pole-position-stroll-2025-11-08`) - Expires: 2025-11-15\n3. **Alaves Win on 2025-11-08** (market_slug: `lal-gir-ala-2025-11-08-ala`) - Expires: 2025-11-08\n4. **VfB Stuttgart vs. FC Augsburg Draw** (market_slug: `bun-stu-aug-2025-11-09-draw`) - Expires: 2025-11-09\n5. **Wilberforce Bulldogs vs. Wright State Raiders (W)** (market_slug: `cwbb-wilb-wrght-2025-11-13`) - Expires: 2025-11-13\n6. **US Granville Win on 2025-11-16** (market_slug: `cde-gra-din-2025-11-16-gra`) - Expires: 2025-11-16\n7. **FIDE World Cup 2025 - Andrey Esipenko vs Pouya Idani** (market_slug: `fide-world-cup-2025-andrey-esipenko-pouya-idani`) - Expires: 2025-11-10\n8. **Bitcoin Above $100,000 on November 11** (market_slug: `bitcoin-above-100k-on-november-11`) - Expires: 2025-11-11\n9. **Blues vs. Islanders NHL Game** (market_slug: `nhl-stl-nyi-2025-11-22`) - Expires: 2025-11-22\n\nThese markets cover various categories including sports (soccer, F1, basketball, hockey), cryptocurrency price predictions, and chess competitions.\n\n## Key Insights and Limitations:\n\n### Key Insights:\n- Most markets expiring soon are sports-related, particularly soccer matches\n- There are two cryptocurrency price prediction markets (Solana and Bitcoin)\n- All markets listed are currently active and not yet closed\n- The markets have various minimum order sizes and tick sizes, with most having a 5 USDC minimum order\n- Several markets have specific resolution criteria detailed in their descriptions\n\n### Limitations:\n- The data only shows markets expiring within approximately the next 30 days\n- Historical performance data for these markets is not included\n- Current market prices and trading volumes are not provided\n- The query was limited to 10 results, so there may be additional markets expiring soon\n- The data doesn\'t show how these markets have performed over time',
          parentId: "2b5fb463-28e3-4051-8850-d2d109aff0d3",
          start: "2025-11-07T14:27:05.174252Z",
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "assistant_message",
          waitForAnswer: false,
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "stream_start",
        {
          command: null,
          createdAt: "2025-11-07T14:27:05.174252Z",
          end: "2025-11-07T14:27:05.174252Z",
          id: "b5a856b8-403a-4556-bf50-31fa9881ea67",
          isError: false,
          language: null,
          metadata: {},
          name: "DataLayer AI Assistant",
          output:
            '# Polymarket Markets Expiring Within the Next Month\n\nBased on your request, I\'ve found several Polymarket prediction markets that are set to expire within the next month. Below is a detailed breakdown of one market along with its complete table fields:\n\n## Market Details\n\n**Market Slug:** `solana-above-150-on-november-13`\n\n### Complete Market Data\n- **Condition ID:** 0x002ca0fdf942fc05b704d024c201a5605dabd0788208419a8caa5096d1336057\n- **Question ID:** 0x3b5b611f3c11465503f31e915be54a0e54c9024169e1243d29f5ed92a230592a\n- **Tokens:** \n  - ["9458001593611272609329440281441211311614303803364800370525378474814716572182", "Yes"]\n  - ["99612821278226028866453146220607685174266097566969459575001584323950788663291", "No"]\n- **Rewards:** {"rates":null,"min_size":0,"max_spread":0}\n- **Minimum Order Size:** 5\n- **Minimum Tick Size:** 0.01\n- **Description:** This market will resolve to "Yes" if the Binance 1 minute candle for SOL/USDT 12:00 in the ET timezone (noon) on the date specified in the title has a final "Close" price higher than the price specified in the title. Otherwise, this market will resolve to "No". The resolution source for this market is Binance, specifically the SOL/USDT "Close" prices currently available at https://www.binance.com/en/trade/SOL_USDT with "1m" and "Candles" selected on the top bar. Please note that this market is about the price according to Binance SOL/USDT, not according to other sources or spot markets. Price precision is determined by the number of decimal places in the source.\n- **Tags:** ["Solana", "Weekly", "Multi Strikes", "Crypto", "Crypto Prices", "Recurring", "Hide From New"]\n- **End Date ISO:** 2025-11-13T01:00:00\n- **Game Start Time:** 1970-01-01T01:00:00\n- **Question:** Will the price of Solana be above $150 on November 13?\n- **Market Slug:** solana-above-150-on-november-13\n- **Min Incentive Size:** ""\n- **Max Incentive Spread:** ""\n- **Active:** true\n- **Closed:** false\n- **Seconds Delay:** 0\n- **Icon:** https://polymarket-upload.s3.us-east-2.amazonaws.com/SOL-logo.png\n- **FPMM:** ""\n- **Winner:** ""\n- **Archived:** 0\n\n## Other Markets Expiring Soon\n\nHere are some other markets that will expire within the next month:\n\n1. **CMS Oissel vs. US Quevilly-Rouen Métropole Draw** (market_slug: `cde-cms-que-2025-11-15-draw`) - Expires: 2025-11-15\n2. **Lance Stroll Pole Position at F1 Brazilian Grand Prix** (market_slug: `f1-brazilian-grand-prix-driver-pole-position-stroll-2025-11-08`) - Expires: 2025-11-15\n3. **Alaves Win on 2025-11-08** (market_slug: `lal-gir-ala-2025-11-08-ala`) - Expires: 2025-11-08\n4. **VfB Stuttgart vs. FC Augsburg Draw** (market_slug: `bun-stu-aug-2025-11-09-draw`) - Expires: 2025-11-09\n5. **Wilberforce Bulldogs vs. Wright State Raiders (W)** (market_slug: `cwbb-wilb-wrght-2025-11-13`) - Expires: 2025-11-13\n6. **US Granville Win on 2025-11-16** (market_slug: `cde-gra-din-2025-11-16-gra`) - Expires: 2025-11-16\n7. **FIDE World Cup 2025 - Andrey Esipenko vs Pouya Idani** (market_slug: `fide-world-cup-2025-andrey-esipenko-pouya-idani`) - Expires: 2025-11-10\n8. **Bitcoin Above $100,000 on November 11** (market_slug: `bitcoin-above-100k-on-november-11`) - Expires: 2025-11-11\n9. **Blues vs. Islanders NHL Game** (market_slug: `nhl-stl-nyi-2025-11-22`) - Expires: 2025-11-22\n\nThese markets cover various categories including sports (soccer, F1, basketball, hockey), cryptocurrency price predictions, and chess competitions.\n\n## Key Insights and Limitations:\n\n### Key Insights:\n- Most markets expiring soon are sports-related, particularly soccer matches\n- There are two cryptocurrency price prediction markets (Solana and Bitcoin)\n- All markets listed are currently active and not yet closed\n- The markets have various minimum order sizes and tick sizes, with most having a 5 USDC minimum order\n- Several markets have specific resolution criteria detailed in their descriptions\n\n### Limitations:\n- The data only shows markets expiring within approximately the next 30 days\n- Historical performance data for these markets is not included\n- Current market prices and trading volumes are not provided\n- The query was limited to 10 results, so there may be additional markets expiring soon\n- The data doesn\'t show how these markets have performed over time',
          parentId: "2b5fb463-28e3-4051-8850-d2d109aff0d3",
          start: "2025-11-07T14:27:05.174252Z",
          streaming: true,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "assistant_message",
          waitForAnswer: false,
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "update_message",
        {
          createdAt: "2025-11-07T14:28:12.876267Z",
          defaultOpen: false,
          end: "2025-11-07T14:28:12.877450Z",
          generation: null,
          id: "cc809225-77dd-49d6-9d74-4d4a82d21ac5",
          input: "",
          isError: false,
          language: null,
          metadata: {},
          name: "Synthesis",
          output: "Synthesizing the final answer based on gathered data...",
          parentId: "2b5fb463-28e3-4051-8850-d2d109aff0d3",
          showInput: false,
          start: "2025-11-07T14:28:12.876309Z",
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "undefined",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "new_message",
        {
          createdAt: "2025-11-07T14:28:12.876267Z",
          defaultOpen: false,
          end: null,
          generation: null,
          id: "cc809225-77dd-49d6-9d74-4d4a82d21ac5",
          input: "",
          isError: false,
          language: null,
          metadata: {},
          name: "Synthesis",
          output: "",
          parentId: "2b5fb463-28e3-4051-8850-d2d109aff0d3",
          showInput: false,
          start: "2025-11-07T14:28:12.876309Z",
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "undefined",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "update_message",
        {
          createdAt: "2025-11-07T14:27:27.983015Z",
          defaultOpen: false,
          end: null,
          generation: null,
          id: "e2fd8840-9008-4d93-9e9e-74d4e469166e",
          input:
            '{\n    "query": "SELECT *\\nFROM polymarket.markets\\nWHERE end_date_iso IS NOT NULL\\n  AND end_date_iso > NOW()\\n  AND end_date_iso < NOW() + INTERVAL 30 DAY\\n  AND active = true\\nLIMIT 10"\n}',
          isError: false,
          language: null,
          metadata: {},
          name: "Tool: polymarket_query",
          output:
            '[{"condition_id": "0x0009a7d7df0829a770b15d1c2b3335b2c62cfa1e38c7fec0fe4ef280b58518de", "question_id": "0x62526ec1a58a4035a4b58d0c610629ea9604cee9a666fcdc9b1b49b4ffb68001", "tokens": [["63699697465384799097248127452344195724175213859094677769875888162805996756244", "Yes"], ["47120933999983535648563491952810544761137058621399080713027980375867354161066", "No"]], "rewards": "{\\"rates\\":null,\\"min_size\\":0,\\"max_spread\\":0}", "minimum_order_size": "5", "minimum_tick_size": "0.01", "description": "In the upcoming game, scheduled for November 15, 2025\\nIf the game ends in a draw, this market will resolve to \\"Yes\\".\\nOtherwise, this market will resolve to \\"No\\".\\nIf the game is postponed, this market will remain open until the game has been completed.\\nIf the game is canceled entirely, with no make-up game, this market will resolve to \\"Yes\\".\\nThis market refers only to the outcome within the first 90 minutes of regular play plus stoppage time.", "tags": ["Sports", "Games", "Soccer", "Coupe de France"], "end_date_iso": "2025-11-15T01:00:00", "game_start_time": "2025-11-15T18:00:00", "question": "Will CMS Oissel vs. US Quevilly-Rouen M\\u00e9tropole end in a draw?", "market_slug": "cde-cms-que-2025-11-15-draw", "min_incentive_size": "", "max_incentive_spread": "", "active": true, "closed": false, "seconds_delay": 3, "icon": "https://polymarket-upload.s3.us-east-2.amazonaws.com/coupe-france-soccer-6cf56ac790.png", "fpmm": "", "winner": "", "archived": 0}, {"condition_id": "0x002ca0fdf942fc05b704d024c201a5605dabd0788208419a8caa5096d1336057", "question_id": "0x3b5b611f3c11465503f31e915be54a0e54c9024169e1243d29f5ed92a230592a", "tokens": [["9458001593611272609329440281441211311614303803364800370525378474814716572182", "Yes"], ["99612821278226028866453146220607685174266097566969459575001584323950788663291", "No"]], "rewards": "{\\"rates\\":null,\\"min_size\\":0,\\"max_spread\\":0}", "minimum_order_size": "5", "minimum_tick_size": "0.01", "description": "This market will resolve to \\"Yes\\" if the Binance 1 minute candle for SOL/USDT 12:00 in the ET timezone (noon) on the date specified in the title has a final \\"Close\\" price higher than the price specified in the title. Otherwise, this market will resolve to \\"No\\".\\n\\nThe resolution source for this market is Binance, specifically the SOL/USDT \\"Close\\" prices currently available at https://www.binance.com/en/trade/SOL_USDT with \\"1m\\" and \\"Candles\\" selected on the top bar.\\n\\nPlease note that this market is about the price according to Binance SOL/USDT, not according to other sources or spot markets.\\n\\nPrice precision is determined by the number of decimal places in the source.", "tags": ["Solana", "Weekly", "Multi Strikes", "Crypto", "Crypto Prices", "Recurring", "Hide From New"], "end_date_iso": "2025-11-13T01:00:00", "game_start_time": "1970-01-01T01:00:00", "question": "Will the price of Solana be above $150 on November 13?", "market_slug": "solana-above-150-on-november-13", "min_incentive_size": "", "max_incentive_spread": "", "active": true, "closed": false, "seconds_delay": 0, "icon": "https://polymarket-upload.s3.us-east-2.amazonaws.com/SOL-logo.png", "fpmm": "", "winner": "", "archived": 0}, {"condition_id": "0x0032e2b47bf7d30102ccf00d850b2180fd8f1fa7adf07003ee9ab810b8bdae74", "question_id": "0x44cafd39e3b390bbbc7ca8f9d4ac6b05467e19b47721b228dc026ea543d6cd03", "tokens": [["112172586977619204208470388071810190039384119200846359132547311868831560045261", "Yes"], ["24179983793995989702525459713988655310964253351271122582413906793820708875657", "No"]], "rewards": "{\\"rates\\":null,\\"min_size\\":0,\\"max_spread\\":0}", "minimum_order_size": "5", "minimum_tick_size": "0.001", "description": "This is a polymarket on the driver who achieves pole position at the 2025 F1 Brazilian Grand Prix, scheduled for Nov 8, 2025.\\n\\nIf the 2025 F1 Brazilian Grand Prix is canceled or rescheduled to a date after Nov 15, 2025, this market will resolve to \\u201cOther.\\u201d\\n\\nThis market will resolve in favor of the driver who is officially recognized by Formula 1 as having set the fastest time during the qualifying session for the 2025 F1 Brazilian Grand Prix. The market will be settled based on the FIA\'s official qualifying results, regardless of any subsequent penalties, disqualifications, or changes to the starting grid.\\n\\nFor example, if a driver sets the fastest qualifying time but later receives a grid penalty or is moved down the starting order, the market will still resolve to \\u201cYes\\u201d for that driver.\\n\\nThe resolution source will be the official Formula 1 website and a consensus of credible sports news reporting.", "tags": ["Sports", "Grand Prix", "Formula 1", "f1", "Games"], "end_date_iso": "2025-11-15T01:00:00", "game_start_time": "2025-11-08T19:00:00", "question": "Will Lance Stroll get pole position at the 2025 F1 Brazilian Grand Prix?", "market_slug": "f1-brazilian-grand-prix-driver-pole-position-stroll-2025-11-08", "min_incentive_size": "", "max_incentive_spread": "", "active": true, "closed": false, "seconds_delay": 3, "icon": "https://polymarket-upload.s3.us-east-2.amazonaws.com/f1-constructors-champion-2025-PULWDiyoGXZ7.png", "fpmm": "", "winner": "", "archived": 0}, {"condition_id": "0x0045b49312f21d8e21509e96df5423a784d8ead8d14f9e67e46af9905190582f", "question_id": "0x2e5514e659377d1f84ba082d797ea85997cac99b72301a2af46c5e5f5e3ddf02", "tokens": [["93704681262917757096763261692937443508080807552824297752327152581523365750643", "Yes"], ["111045583050637274654054803505848169961630226647296899373418403413322125333719", "No"]], "rewards": "{\\"rates\\":null,\\"min_size\\":0,\\"max_spread\\":0}", "minimum_order_size": "5", "minimum_tick_size": "0.01", "description": "In the upcoming game, scheduled for November 8, 2025\\nIf Alaves wins, this market will resolve to \\"Yes\\".\\nOtherwise, this market will resolve to \\"No\\".\\nIf the game is postponed, this market will remain open until the game has been completed.\\nIf the game is canceled entirely, with no make-up game, this market will resolve \\"No\\".\\nThis market refers only to the outcome within the first 90 minutes of regular play plus stoppage time.", "tags": ["Sports", "La Liga", "Games", "Soccer"], "end_date_iso": "2025-11-08T01:00:00", "game_start_time": "2025-11-08T14:00:00", "question": "Will Alaves win on 2025-11-08?", "market_slug": "lal-gir-ala-2025-11-08-ala", "min_incentive_size": "", "max_incentive_spread": "", "active": true, "closed": false, "seconds_delay": 3, "icon": "https://polymarket-upload.s3.us-east-2.amazonaws.com/league-lal.png", "fpmm": "", "winner": "", "archived": 0}, {"condition_id": "0x0054b96491280169428b7dc207736031ad23ef78bd4e47665e5047a70db70657", "question_id": "0xa4688d61129af593c12c3698c3bd99e58a9126273fb0b17ecc167bd5c0a95801", "tokens": [["15165503503030499740632260094787773818585519513629653355766143968371938272003", "Yes"], ["27991006548867677660163865415692500374840330767544202082126358907276226424484", "No"]], "rewards": "{\\"rates\\":null,\\"min_size\\":0,\\"max_spread\\":0}", "minimum_order_size": "5", "minimum_tick_size": "0.01", "description": "In the upcoming game, scheduled for November 9, 2025\\nIf the game ends in a draw, this market will resolve to \\"Yes\\".\\nOtherwise, this market will resolve to \\"No\\".\\nIf the game is postponed, this market will remain open until the game has been completed.\\nIf the game is canceled entirely, with no make-up game, this market will resolve to \\"Yes\\".", "tags": ["Sports", "bundesliga", "Games", "Soccer"], "end_date_iso": "2025-11-09T01:00:00", "game_start_time": "2025-11-09T17:30:00", "question": "Will VfB Stuttgart vs. FC Augsburg end in a draw?", "market_slug": "bun-stu-aug-2025-11-09-draw", "min_incentive_size": "", "max_incentive_spread": "", "active": true, "closed": false, "seconds_delay": 3, "icon": "https://polymarket-upload.s3.us-east-2.amazonaws.com/league-bun.jpg", "fpmm": "", "winner": "", "archived": 0}, {"condition_id": "0x0066bf16550af0229626213fd682f25539f8680c425df2e28f558d2f7fe374f5", "question_id": "0x8997de3c554cf7b4e039dcfccf32e800789bf3d0b3773c265011a7aeadb197cc", "tokens": [["4813857092475208328524825833084556616300408775005111372643372625990939524115", "Wilberforce Bulldogs"], ["82766889536193090503568856382247671853766098106680988768674739838921753254234", "Wright State Raiders"]], "rewards": "{\\"rates\\":null,\\"min_size\\":0,\\"max_spread\\":0}", "minimum_order_size": "5", "minimum_tick_size": "0.01", "description": "In the upcoming WBB game, scheduled for November 12 at 7:00 PM ET:\\n\\nIf the Wilberforce Bulldogs win, the market will resolve to \\"Wilberforce Bulldogs\\".\\n\\nIf the Wright State Raiders win, the market will resolve to \\"Wright State Raiders\\".\\n\\nIf the game is postponed, this market will remain open until the game has been completed.\\n\\nIf the game is canceled entirely, with no make-up game, this market will resolve 50-50.\\n\\nThe result will be determined based on the final score including any overtime periods.", "tags": ["Sports", "Basketball", "NCAA", "Games", "CWBB"], "end_date_iso": "2025-11-13T01:00:00", "game_start_time": "2025-11-13T01:00:00", "question": "Wilberforce Bulldogs vs. Wright State Raiders (W)", "market_slug": "cwbb-wilb-wrght-2025-11-13", "min_incentive_size": "", "max_incentive_spread": "", "active": true, "closed": false, "seconds_delay": 3, "icon": "https://polymarket-upload.s3.us-east-2.amazonaws.com/ncaa-c14995df96.png", "fpmm": "", "winner": "", "archived": 0}, {"condition_id": "0x006aacdb8b0ebf590dcb1a3a880dff6956ac7b86722c7fa5d858d3e8f7da988d", "question_id": "0x6d6e36d9a12469ecf346512c4b0299b76c7c1c5b745af0f3877fd2af8d4e5200", "tokens": [["108269402557761342186091990666213922566329969876392550921260086487808843050867", "Yes"], ["3511568306200939622002073986410032841759476477319042231748322818582204665634", "No"]], "rewards": "{\\"rates\\":null,\\"min_size\\":0,\\"max_spread\\":0}", "minimum_order_size": "5", "minimum_tick_size": "0.01", "description": "In the upcoming game, scheduled for November 16, 2025\\nIf US Granville wins, this market will resolve to \\"Yes\\".\\nOtherwise, this market will resolve to \\"No\\".\\nIf the game is postponed, this market will remain open until the game has been completed.\\nIf the game is canceled entirely, with no make-up game, this market will resolve \\"No\\".\\nThis market refers only to the outcome within the first 90 minutes of regular play plus stoppage time.", "tags": ["Sports", "Games", "Soccer", "Coupe de France"], "end_date_iso": "2025-11-16T01:00:00", "game_start_time": "2025-11-16T14:00:00", "question": "Will US Granville win on 2025-11-16?", "market_slug": "cde-gra-din-2025-11-16-gra", "min_incentive_size": "", "max_incentive_spread": "", "active": true, "closed": false, "seconds_delay": 3, "icon": "https://polymarket-upload.s3.us-east-2.amazonaws.com/coupe-france-soccer-6cf56ac790.png", "fpmm": "", "winner": "", "archived": 0}, {"condition_id": "0x006d71fb5b560e15a647cce749b415ed9154c554899b0e44dd6516b5c5d09e04", "question_id": "0xaffc640c625a9e68172cd8320a8d31cf25fcdbfa4a0a217dfedffe06d5d50471", "tokens": [["18741490923915955145909237438525950112818190702896008539569659499108928182151", "Esipenko"], ["82056627663881382361256130067167135031716119315154870948814774571634534830046", "Idani"]], "rewards": "{\\"rates\\":[{\\"asset_address\\":\\"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174\\",\\"rewards_daily_rate\\":20}],\\"min_size\\":20,\\"max_spread\\":4.5}", "minimum_order_size": "5", "minimum_tick_size": "0.01", "description": "This market will resolve to \\"Esipenko\\" if Andrey Esipenko advances in their Pouya Idani match at the FIDE World Cup 2025.\\n\\nIt will resolve to \\"Idani\\" if Pouya Idani advances in their match against Andrey Esipenko.\\n\\nIf one player withdraws or pulls out and the other advances automatically, this market will resolve to the advancing player.\\n\\nIf the match is cancelled, not played, or the result is otherwise invalid, this market will resolve \\u201c50-50.\\u201d\\n\\nThe resolution source for this market will be official information from F\\u00e9d\\u00e9ration Internationale des \\u00c9checs (FIDE).", "tags": ["Chess", "Sports", "Games"], "end_date_iso": "2025-11-10T01:00:00", "game_start_time": "1970-01-01T01:00:00", "question": "FIDE World Cup 2025 - Andrey Esipenko vs Pouya Idani (Advances)", "market_slug": "fide-world-cup-2025-andrey-esipenko-pouya-idani", "min_incentive_size": "", "max_incentive_spread": "", "active": true, "closed": false, "seconds_delay": 0, "icon": "https://polymarket-upload.s3.us-east-2.amazonaws.com/fide-wc-2025-10bddafe11.png", "fpmm": "", "winner": "", "archived": 0}, {"condition_id": "0x0076c6739a68d2a83d3e761a854585e40a3c59145f96f87b36105469347710c0", "question_id": "0x761b42b8ac02206d0180711992f4d3a3d3544e32b18523d29d807d5d8919234f", "tokens": [["87183390822116240775037630476925870415771552364673668114586231622758321202541", "Yes"], ["94381557382767342481557204338339946623959529485134657361916568867465689413958", "No"]], "rewards": "{\\"rates\\":null,\\"min_size\\":0,\\"max_spread\\":0}", "minimum_order_size": "5", "minimum_tick_size": "0.01", "description": "This market will resolve to \\"Yes\\" if the Binance 1 minute candle for BTC/USDT 12:00 in the ET timezone (noon) on the date specified in the title has a final \\"Close\\" price higher than the price specified in the title. Otherwise, this market will resolve to \\"No\\".\\n\\nThe resolution source for this market is Binance, specifically the BTC/USDT \\"Close\\" prices currently available at https://www.binance.com/en/trade/BTC_USDT with \\"1m\\" and \\"Candles\\" selected on the top bar.\\n\\nPlease note that this market is about the price according to Binance BTC/USDT, not according to other sources or spot markets.\\n\\nPrice precision is determined by the number of decimal places in the source.", "tags": ["Recurring", "Hide From New", "Crypto", "Crypto Prices", "Weekly", "Multi Strikes", "Bitcoin"], "end_date_iso": "2025-11-11T01:00:00", "game_start_time": "1970-01-01T01:00:00", "question": "Will the price of Bitcoin be above $100,000 on November 11?", "market_slug": "bitcoin-above-100k-on-november-11", "min_incentive_size": "", "max_incentive_spread": "", "active": true, "closed": false, "seconds_delay": 0, "icon": "https://polymarket-upload.s3.us-east-2.amazonaws.com/BTC+fullsize.png", "fpmm": "", "winner": "", "archived": 0}, {"condition_id": "0x00843ede24a547f9dc3d69691bf33380fd1ca2c978e214402b45dae0110e7952", "question_id": "0x29dee79a997eca5e6ead1372d0ed4d2aac6f52bfc92ca6bd686069c2c2a74f3f", "tokens": [["84573382454630976358011120653123392511943175095201900728818938880809679071396", "Blues"], ["42059652700767299211626318434389716944115105238211804509726663065066580655033", "Islanders"]], "rewards": "{\\"rates\\":null,\\"min_size\\":0,\\"max_spread\\":0}", "minimum_order_size": "5", "minimum_tick_size": "0.01", "description": "In the upcoming NHL game, scheduled for November 22 at 10:30AM ET:\\nIf the Blues win, the market will resolve to \\"Blues\\".\\nIf the Islanders win, the market will resolve to \\"Islanders\\".\\nIf the game is postponed, this market will remain open until the game has been completed.\\nIf the game is canceled entirely, with no make-up game, this market will resolve 50-50.\\nThe result will be determined based on the final score including any overtime periods and shootouts. In the event of a shootout, one goal will be added to the winning team\'s score for the purpose of resolution.", "tags": ["Sports", "NHL", "Games"], "end_date_iso": "2025-11-22T01:00:00", "game_start_time": "2025-11-22T16:30:00", "question": "Blues vs. Islanders", "market_slug": "nhl-stl-nyi-2025-11-22", "min_incentive_size": "", "max_incentive_spread": "", "active": true, "closed": false, "seconds_delay": 3, "icon": "https://polymarket-upload.s3.us-east-2.amazonaws.com/nhl.png", "fpmm": "", "winner": "", "archived": 0}]\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n📊 **Execution Metadata:**\n  • Status: ✅ SUCCESS (Quality: 1.0)\n  • Confidence: 0.80 → 0.90 ↑\n  • Decision: Continuing with gathered data\n  • Iteration: #1\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          parentId: null,
          showInput: true,
          start: null,
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "undefined",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "new_message",
        {
          createdAt: "2025-11-07T14:27:27.983015Z",
          defaultOpen: false,
          end: null,
          generation: null,
          id: "e2fd8840-9008-4d93-9e9e-74d4e469166e",
          input:
            '{\n    "query": "SELECT *\\nFROM polymarket.markets\\nWHERE end_date_iso IS NOT NULL\\n  AND end_date_iso > NOW()\\n  AND end_date_iso < NOW() + INTERVAL 30 DAY\\n  AND active = true\\nLIMIT 10"\n}',
          isError: false,
          language: null,
          metadata: {},
          name: "Tool: polymarket_query",
          output: "Running...",
          parentId: null,
          showInput: true,
          start: null,
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "undefined",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "update_message",
        {
          createdAt: "2025-11-07T14:27:23.612700Z",
          defaultOpen: false,
          end: "2025-11-07T14:27:23.614661Z",
          generation: null,
          id: "4d89a6e4-14a2-4140-a02c-d9f1b2301a22",
          input: "",
          isError: false,
          language: null,
          metadata: {},
          name: "Planning",
          output:
            '*Query Complexity:* MEDIUM\n\n*Execution Strategy:* SEQUENTIAL\n\n*Tools (3):* `polymarket_query`, `polymarket_info_query`, `resolver_worker_query`\n\n*Initial Confidence:* 70.0%\n\n---\n\n*Reasoning:* # Strategic Execution Plan\n\n## 1. Primary Objective and Sub-objectives\n\n**Primary Objective:** Retrieve Polymarket prediction markets that expire within the next month, including market slugs and all available fields.\n\n**Sub-objectives:**\n- Identify all active Polymarket prediction markets\n- Filter markets by expiration date (within next month)\n- Retrieve comprehensive market data including slugs and all available fields\n- Ensure technical data about these markets is complete\n\n## 2. Required Information Sources\n\n**Primary Tools:**\n- `polymarket_query`: To retrieve comprehensive market data including expiration dates\n- `polymarket_info_query`: To get additional technical details about specific markets\n\n**Supporting Tool:**\n- `resolver_worker_query`: May be needed for data processing if the result set is large\n\n## 3. Execution Strategy\n\n**Sequential Execution (Moderate Complexity):**\n1. First, use `polymarket_query` to get all active markets with expiration dates\n2. Then, filter the results to identify markets expiring within the next month\n3. If needed, use `polymarket_info_query` to enrich the data with additional technical details\n\n## 4. Dependencies\n\n- The `polymarket_info_query` depends on the results from the initial `polymarket_query` as it requires market identifiers\n- Data filtering operations depend on having accurate timestamp data from the initial query\n\n## 5. Expected Challenges and Fallback Strategies\n\n**Potential Challenges:**\n- Large result set may require pagination or chunking\n- Expiration date format might need standardization\n- Some markets might have incomplete data\n\n**Fallback Strategies:**\n- If `polymarket_query` returns too many results, implement pagination\n- If expiration date filtering is challenging, use `resolver_worker_query` to process the data\n- If specific markets have incomplete data, use `polymarket_info_query` to fill gaps\n\n## 6. Success Criteria\n\n- Complete dataset containing all Polymarket prediction markets expiring within the next month\n- Each market record includes the market slug and all available fields\n- Technical data is complete and accurate\n- Results are properly formatted for user consumption\n\n## Execution Approach\n\nThis is a **moderate complexity query** requiring sequential execution with 2-3 tools:\n\n1. **Initial Data Retrieval:**\n   ```\n   polymarket_query(\n     query_type: "markets",\n     filter: {\n       status: "active"\n     },\n     fields: ["slug", "question", "description", "expiresAt", "volume", "liquidity", "categories", "outcomes", "url", "createdAt", "resolutionSource", "isResolved"]\n   )\n   ```\n\n2. **Data Filtering:**\n   Filter results to include only markets where expiresAt is between current date and current date + 30 days\n\n3. **Enrichment (if needed):**\n   For each market in filtered results, use `polymarket_info_query` to get additional technical details\n\nThis plan addresses both detected intentions:\n- PREDICTION_MARKETS (90.0%): By retrieving comprehensive Polymarket data\n- TECHNICAL_DATA (60.0%): By ensuring all technical fields are included and potentially enriching with `polymarket_info_query`',
          parentId: "2b5fb463-28e3-4051-8850-d2d109aff0d3",
          showInput: false,
          start: "2025-11-07T14:27:23.612737Z",
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "undefined",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "new_message",
        {
          createdAt: "2025-11-07T14:27:23.612700Z",
          defaultOpen: false,
          end: null,
          generation: null,
          id: "4d89a6e4-14a2-4140-a02c-d9f1b2301a22",
          input: "",
          isError: false,
          language: null,
          metadata: {},
          name: "Planning",
          output: "",
          parentId: "2b5fb463-28e3-4051-8850-d2d109aff0d3",
          showInput: false,
          start: "2025-11-07T14:27:23.612737Z",
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "undefined",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "update_message",
        {
          createdAt: "2025-11-07T14:27:10.637658Z",
          defaultOpen: false,
          end: "2025-11-07T14:27:10.640220Z",
          generation: null,
          id: "c2125de3-491d-4af3-97dc-b61bd8b30a65",
          input: "",
          isError: false,
          language: null,
          metadata: {},
          name: "Intention Detection",
          output:
            "*Multiple Intentions Detected:* **2**\n\n*Primary:* **prediction_markets**\n\n*All Intentions:*\n  • **prediction_markets** (priority: 90.0%) - Keywords: маркет слаг, поля, таблицы рынка\n  • **technical_data** (priority: 60.0%) - Keywords: поля, таблицы рынка, маркет слаг\n\n*Overall Confidence:* 85.0%\n\n*Ambiguous:* No ✓\n\n*References Previous:* No\n\n---\n\n*Enhanced Query:*\n> Provide a market slug and all fields from the Polymarket prediction market table that expires within the next month\n\n",
          parentId: "2b5fb463-28e3-4051-8850-d2d109aff0d3",
          showInput: false,
          start: "2025-11-07T14:27:10.637715Z",
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "undefined",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "new_message",
        {
          createdAt: "2025-11-07T14:27:10.637658Z",
          defaultOpen: false,
          end: null,
          generation: null,
          id: "c2125de3-491d-4af3-97dc-b61bd8b30a65",
          input: "",
          isError: false,
          language: null,
          metadata: {},
          name: "Intention Detection",
          output: "",
          parentId: "2b5fb463-28e3-4051-8850-d2d109aff0d3",
          showInput: false,
          start: "2025-11-07T14:27:10.637715Z",
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "undefined",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "new_message",
        {
          command: null,
          createdAt: "2025-11-07T14:27:05.174252Z",
          end: "2025-11-07T14:27:05.174252Z",
          id: "b5a856b8-403a-4556-bf50-31fa9881ea67",
          isError: false,
          language: null,
          metadata: {},
          name: "DataLayer AI Assistant",
          output: "",
          parentId: "2b5fb463-28e3-4051-8850-d2d109aff0d3",
          start: "2025-11-07T14:27:05.174252Z",
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "assistant_message",
          waitForAnswer: false,
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "new_message",
        {
          createdAt: "2025-11-07T14:27:05.156753Z",
          defaultOpen: false,
          end: null,
          generation: null,
          id: "2b5fb463-28e3-4051-8850-d2d109aff0d3",
          input: "",
          isError: false,
          language: null,
          metadata: {},
          name: "on_message",
          output: "",
          parentId: "1c787b43-901d-4d2b-8309-412fc6776ff0",
          showInput: "json",
          start: "2025-11-07T14:27:05.156800Z",
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "run",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "first_interaction",
        {
          interaction:
            "дай мен любой маркет слаг и все поля из таблицы рынка полимаркет который заканчивается в ближаший месяц",
          thread_id: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: ["task_start", {}],
    },
  ],
  [
    {
      type: "user",
      message: {
        text: "дай мен любой маркет слаг и все поля из таблицы рынка полимаркет который заканчивается в ближаший месяц",
      },
    },
  ],
  [
    {
      type: "agent",
      message: ["task_end", {}],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "update_message",
        {
          createdAt: "2025-11-07T14:23:37.056496Z",
          defaultOpen: false,
          end: "2025-11-07T14:23:37.168234Z",
          generation: null,
          id: "36e9f69d-7bf6-46f2-92c8-52fbb49a96f9",
          input: "{}",
          isError: false,
          language: null,
          metadata: {},
          name: "on_chat_start",
          output: "",
          parentId: null,
          showInput: "json",
          start: "2025-11-07T14:23:37.056531Z",
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "run",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "new_message",
        {
          command: null,
          createdAt: "2025-11-07T14:23:37.167198Z",
          end: "2025-11-07T14:23:37.167198Z",
          id: "a7cba2a5-28d6-4564-8e2d-67a78bfefe8a",
          isError: false,
          language: null,
          metadata: {},
          name: "DataLayer",
          output:
            "**DataLayer AI Assistant**\n\nI'm your intelligent crypto data analysis companion. Ask me anything!\n\n*branch - local_dev_chainlit_gosha\ncommit - corrected prompts for semantic search\ndate - 2025-11-06 20:37:53 +0300*",
          parentId: "36e9f69d-7bf6-46f2-92c8-52fbb49a96f9",
          start: "2025-11-07T14:23:37.167198Z",
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "assistant_message",
          waitForAnswer: false,
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "new_message",
        {
          createdAt: "2025-11-07T14:23:37.056496Z",
          defaultOpen: false,
          end: null,
          generation: null,
          id: "36e9f69d-7bf6-46f2-92c8-52fbb49a96f9",
          input: "",
          isError: false,
          language: null,
          metadata: {},
          name: "on_chat_start",
          output: "",
          parentId: null,
          showInput: "json",
          start: "2025-11-07T14:23:37.056531Z",
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "run",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: [
        "new_message",
        {
          createdAt: "2025-11-07T14:23:37.056496Z",
          defaultOpen: false,
          end: null,
          generation: null,
          id: "36e9f69d-7bf6-46f2-92c8-52fbb49a96f9",
          input: "",
          isError: false,
          language: null,
          metadata: {},
          name: "on_chat_start",
          output: "",
          parentId: null,
          showInput: "json",
          start: "2025-11-07T14:23:37.056531Z",
          streaming: false,
          tags: null,
          threadId: "ec96be4a-5910-4799-a14f-eafd6ef872c8",
          type: "run",
        },
      ],
    },
  ],
  [
    {
      type: "agent",
      message: ["task_start", {}],
    },
  ],
  [
    {
      type: "agent",
      message: ["clear_call_fn", {}],
    },
  ],
  [
    {
      type: "agent",
      message: ["clear_ask", {}],
    },
  ],
  [
    {
      type: "agent",
      message: ["task_end", {}],
    },
  ],
].reverse();
