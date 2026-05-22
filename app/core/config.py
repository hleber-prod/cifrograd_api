import os

from dotenv import load_dotenv


load_dotenv()


def normalize_database_url(database_url: str | None) -> str | None:
    if not database_url:
        return database_url

    if database_url.startswith("postgresql://"):
        return database_url.replace("postgresql://", "postgresql+psycopg://", 1)

    if database_url.startswith("postgres://"):
        return database_url.replace("postgres://", "postgresql+psycopg://", 1)

    return database_url


def normalize_email(email: str | None) -> str:
    return email.strip().lower() if email else ""


def get_admin_emails(primary_email: str, extra_emails: str | None) -> list[str]:
    emails = [
        primary_email,
        *[normalize_email(email) for email in (extra_emails or "").split(",")],
    ]
    return list(dict.fromkeys(email for email in emails if email))


def get_cors_origins() -> list[str]:
    origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    origins.extend(
        origin.strip()
        for origin in os.getenv("CORS_ORIGINS", "").split(",")
        if origin.strip()
    )

    if vercel_url := os.getenv("VERCEL_URL"):
        origins.append(f"https://{vercel_url}")

    return list(dict.fromkeys(origins))


class Settings:
    database_url: str | None = normalize_database_url(
        os.getenv("SUPABASE_DATABASE_URL")
    )
    jwt_secret_key: str = os.getenv("JWT_SECRET_KEY")
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    admin_email: str = normalize_email(os.getenv("ADMIN_EMAIL"))
    admin_password: str = os.getenv("ADMIN_PASSWORD")
    admin_display_name: str = os.getenv("ADMIN_DISPLAY_NAME")
    admin_emails: list[str] = get_admin_emails(admin_email, os.getenv("ADMIN_EMAILS"))
    cors_origins: list[str] = get_cors_origins()


settings = Settings()
