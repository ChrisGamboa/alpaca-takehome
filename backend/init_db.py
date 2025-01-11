import asyncio
from database import engine
from models import Base

async def init_db():
    async with engine.begin() as conn:
        # Drop all tables (optional)
        # await conn.run_sync(Base.metadata.drop_all)
        
        # Create all tables
        await conn.run_sync(Base.metadata.create_all)
    print("Database initialized!")

if __name__ == "__main__":
    asyncio.run(init_db())
