from sqlalchemy import Integer, Sequence, String, Boolean
from sqlalchemy.orm import mapped_column, Mapped

from settings import DataBase
from sql_app.base import Base


class Post(Base):
    __tablename__ = 'posts'
    __table_args__ = {'schema': DataBase.SCHEMA}

    id: Mapped[int]=mapped_column(
        Integer,
        Sequence('posts_id_seq', metadata=Base.metadata),
        primary_key=True,
        nullable=False
    )
    title: Mapped[str] = mapped_column(String, nullable=False)
    content: Mapped[str] = mapped_column(String, nullable=False)
    is_deleted: Mapped[bool]=mapped_column(Boolean, nullable=False, default=False)