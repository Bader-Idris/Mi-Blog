#!/c/'Program Files'/nodejs/
// #!/usr/bin/env node

const { article } = require('../../middleware/db/articlesDB');
// docker exec -it my-blog-psql psql -U postgres -d articles

const executeQuery = async (query) => {
  const client = await article.connect();
  try {
    await client.query(query);
  } catch (error) {
    console.error('Error executing query:', error);
  } finally {
    client.release();
  }
};

// SQL statements
const createExtensionQuery = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";';
const createDatabaseQuery = 
`DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'articles') THEN
    CREATE DATABASE articles;
  ELSE
    RAISE NOTICE 'Database "articles" already exists.';
  END IF;
END $$;`;

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS article(
    article_uuid UUID DEFAULT uuid_generate_v4(),
    title VARCHAR(255),
    content TEXT,
    author_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_id UUID,
    published BOOLEAN,
    views INT,
    likes INT,
    PRIMARY KEY (article_uuid)
  );
`;

(async () => {
  try {
    await executeQuery(createExtensionQuery);
    await executeQuery(createDatabaseQuery);
    await executeQuery(createTableQuery);
  } finally {
    article.end();
  }
})();

/*
INSERT INTO article(article_uuid, title, content, author_id, created_at, updated_at, category_id, published, views, likes)
VALUES
  (uuid_generate_v4(), 'A Journey of Love and Hope', 'In a world filled with chaos and uncertainty, one person''s story of love and hope shines through. Follow the inspiring journey of Sarah, a young woman who overcame adversity and found true love in the most unexpected place.', '123456', current_timestamp, current_timestamp, '987654', true, 100, 50),
  (uuid_generate_v4(), 'The Power of Forgiveness', 'Discover the incredible power of forgiveness as we delve into the life of Mark, a man who faced immense pain and tragedy but found healing and redemption through the act of forgiving those who wronged him.', '789012', current_timestamp, current_timestamp, '654321', false, 50, 20),
  (uuid_generate_v4(), 'A Mother''s Unconditional Love', 'Experience the heartwarming story of Emma, a single mother who selflessly dedicated her life to raising her child against all odds. Through her unwavering love and sacrifice, Emma teaches us the true meaning of unconditional love.', '456789', current_timestamp, current_timestamp, '987654', true, 75, 30);
*/

/* 
INSERT INTO article(article_uuid, title, content, author_id, created_at, updated_at, category_id, published, views, likes)
VALUES(uuid_generate_v4(), 'testing1','little content', uuid_generate_v4(), current_timestamp, current_timestamp, uuid_generate_v4(), true, 75, 30);
*/