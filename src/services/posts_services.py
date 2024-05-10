from typing import List

from sqlalchemy import select, and_
from sqlalchemy.orm import Session

from schemas import post_schemas
from sql_app.models import posts
def create_post(
    title: str,
    content: str,
    db: Session
) -> posts.Post:
    post_instance = posts.Post(
        title=title,
        content=content
    )
    db.add(post_instance)
    db.commit()
    db.refresh(post_instance)
    return post_instance


def get_post(
    post_id: int,
    db: Session
) -> posts.Post:
    q = select(posts.Post).where(
        and_(
            posts.Post.id == post_id,
            posts.Post.is_deleted != True
        )
    )
    result = db.scalar(q)
    return result


def list_posts(
        limit: int,
        offset: int,
        db: Session
) -> List[posts.Post]:
    q = select(
        posts.Post
    ).where(
        posts.Post.is_deleted != True
    ).limit(limit).offset(offset)
    result = db.scalars(q)
    return result


def update_post(
        post_obj: posts.Post,
        post_data: post_schemas.ViewPost,
        db: Session
) -> posts.Post:
    post_obj.title = post_data.title
    post_obj.content = post_data.content
    db.commit()
    db.refresh(post_obj)
    return post_obj


def delete_post(
        post_obj: posts.Post,
        db: Session
) -> posts.Post:
    post_obj.is_deleted = True
    db.commit()
    db.refresh(post_obj)
    return post_obj