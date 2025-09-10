# Database Setup Guide - TechOrbitCare

## 🗄️ PostgreSQL + Prisma Configuration

### 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/techorbitcare?schema=public"

# Next.js Configuration
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Contact Information
NEXT_PUBLIC_CALL_NUMBER="+919020554466"
NEXT_PUBLIC_EMAIL="techorbitcare@gmail.com"
NEXT_PUBLIC_ADDRESS="Near Police Station, Court Road, Taliparamba, Kerala"
NEXT_PUBLIC_WHATSAPP_NUMBER="9020554466"

# Site Information
NEXT_PUBLIC_SITE_URL="https://techorbitcare.com"
NEXT_PUBLIC_SITE_NAME="TechOrbitCare"

# Google Search Console Verification
NEXT_PUBLIC_GOOGLE_VERIFICATION="your-google-verification-code"
```

### 2. Production Database Options

#### Option A: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your connection string from Settings > Database
4. Update `DATABASE_URL` in your environment variables

#### Option B: Neon
1. Go to [neon.tech](https://neon.tech)
2. Create a new database
3. Get your connection string
4. Update `DATABASE_URL` in your environment variables

#### Option C: Railway
1. Go to [railway.app](https://railway.app)
2. Create a new PostgreSQL service
3. Get your connection string
4. Update `DATABASE_URL` in your environment variables

#### Option D: Self-hosted PostgreSQL
1. Install PostgreSQL on your server
2. Create a database named `techorbitcare`
3. Update `DATABASE_URL` with your server details

### 3. Database Schema

The schema includes the following models:
- **User**: Customer information and authentication
- **RepairRequest**: Main repair job tracking
- **RepairItem**: Individual services within a repair
- **Review**: Customer reviews and ratings
- **Service**: Available repair services and pricing
- **BusinessSettings**: App configuration
- **ContactSubmission**: Contact form submissions

### 4. Commands to Run

```bash
# Generate Prisma client
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name init

# View your database in Prisma Studio
npx prisma studio

# Reset database (development only)
npx prisma migrate reset
```

### 5. Production Deployment

1. Set up your production database
2. Update environment variables in your hosting platform
3. Run migrations in production:
   ```bash
   npx prisma migrate deploy
   ```
4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

### 6. Security Considerations

- Use connection pooling for production
- Enable SSL/TLS for database connections
- Use strong passwords and rotate them regularly
- Limit database access to your application only
- Regular backups of your database
- Monitor database performance and usage

### 7. Backup Strategy

- Daily automated backups
- Point-in-time recovery capability
- Test restore procedures regularly
- Store backups in multiple locations
