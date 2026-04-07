# SAR - Suspicious Activity Report Generator

An AI-powered banking compliance tool that automatically generates Suspicious Activity Reports (SAR) by analyzing transaction data using machine learning.

## Features

- **AI-Powered Analysis**: Uses OpenRouter's AI models to analyze transaction patterns
- **Real-time Risk Assessment**: Automatically determines risk levels (Low/Medium/High)
- **Comprehensive Reports**: Generates detailed SAR reports with audit trails
- **Database Storage**: Stores all reports in Supabase for compliance tracking
- **Modern UI**: Clean, responsive interface built with Next.js

## Tech Stack

- **Frontend**: Next.js 14, React
- **Backend**: Next.js API Routes
- **AI**: OpenRouter API (Google Gemma model)
- **Database**: Supabase
- **Styling**: Inline CSS with modern design

## Setup

### Prerequisites

- Node.js 18+ installed
- OpenRouter API key (free tier available)
- Supabase project (for report storage)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Vinisha-725/SAR--Suspicious-Activity-Report.git
cd SAR--Suspicious-Activity-Report
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:

```env
OPENROUTER_API_KEY=your-openrouter-api-key
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Fill Transaction Details**: Enter customer information and transaction data
2. **Select Flags**: Choose any suspicious activity flags (optional)
3. **Add Notes**: Provide additional context about the transaction
4. **Generate Report**: Click "Generate SAR" to analyze and create the report
5. **Review Results**: View the risk assessment and recommended actions

## API Endpoints

### POST /api/generate-report

Generates a SAR report by analyzing transaction data.

**Request Body:**
```json
{
  "customer_id": "string",
  "account_number": "string", 
  "transaction_id": "string",
  "amount": "number",
  "transaction_type": "string",
  "location": "string",
  "flag": "string",
  "raw_notes": "string"
}
```

**Response:**
```json
{
  "report": "string",
  "structured": {
    "is_suspicious": boolean,
    "risk_level": "Low|Medium|High",
    "incident_type": "string",
    "audit_trail": "string",
    "summary": "string",
    "recommended_action": "string"
  }
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENROUTER_API_KEY` | OpenRouter API key for AI analysis | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |

## Database Schema

The `reports` table stores all generated SAR reports with the following fields:
- `customer_id`, `account_number`, `transaction_id`
- `amount`, `transaction_type`, `location`, `flag`
- `raw_notes`, `is_suspicious`, `generated_report`
- `created_at` (timestamp)

## Security

- API keys are stored in environment variables (never in code)
- All sensitive data is excluded from git via `.gitignore`
- Database access is secured through Supabase RLS policies
- Input validation on all API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Vinisha-725/SAR--Suspicious-Activity-Report/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## Acknowledgments

- OpenRouter for providing AI model access
- Supabase for the backend database
- Next.js team for the excellent framework
- Banking compliance professionals for industry insights
