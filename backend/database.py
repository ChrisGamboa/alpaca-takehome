from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "sqlite+aiosqlite:///./notes.db"

# Create the async engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create the session maker
async_session = sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)

# Base class for models
Base = declarative_base()

# Dependency to get a database session
async def get_db():
    async with async_session() as session:
        yield session