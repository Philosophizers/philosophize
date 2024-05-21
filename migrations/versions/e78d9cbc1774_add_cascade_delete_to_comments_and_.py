"""Add named foreign key constraints to comments and topics"""

from alembic import op
import sqlalchemy as sa

# Revision identifiers, used by Alembic.
revision = 'e78d9cbc1774'
down_revision = '20dc9bd09bd6'
branch_labels = None
depends_on = None

def upgrade():
    # Adding named foreign key constraints
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.create_foreign_key('fk_comments_topic_id', 'topics', ['topic_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key('fk_comments_user_id', 'users', ['user_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('topics', schema=None) as batch_op:
        batch_op.create_foreign_key('fk_topics_user_id', 'users', ['user_id'], ['id'], ondelete='CASCADE')

def downgrade():
    # Dropping named foreign key constraints
    with op.batch_alter_table('comments', schema=None) as batch_op:
        batch_op.drop_constraint('fk_comments_topic_id', type_='foreignkey')
        batch_op.drop_constraint('fk_comments_user_id', type_='foreignkey')

    with op.batch_alter_table('topics', schema=None) as batch_op:
        batch_op.drop_constraint('fk_topics_user_id', type_='foreignkey')
