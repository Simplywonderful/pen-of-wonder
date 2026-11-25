-- pow-api's D1 database "pow" (revamp brief 5.1). Every table the brief lists, created once, so later
-- phases add code rather than schema. Times are ISO 8601 strings in UTC. Personal data lives only in
-- `submissions`; everything else is hashed or aggregate.

-- Form messages from every world (R3).
CREATE TABLE submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  world TEXT NOT NULL,
  form_type TEXT NOT NULL,          -- enquiry, quote, notify
  service TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organisation TEXT,
  message TEXT,
  link TEXT,
  consent_at TEXT NOT NULL,
  user_agent_hash TEXT,
  elapsed_ms INTEGER,
  status TEXT NOT NULL DEFAULT 'new', -- new, replied, spam, deleted
  notified_at TEXT
);
CREATE INDEX submissions_created ON submissions (created_at);
CREATE INDEX submissions_world_created ON submissions (world, created_at);

-- Newsletter signups (R4). The list itself lives in Brevo; only a hash and the outcome are kept here.
CREATE TABLE subscribers_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  world TEXT NOT NULL,
  list TEXT NOT NULL,
  email_hash TEXT NOT NULL,
  result TEXT NOT NULL
);
CREATE INDEX subscribers_log_created ON subscribers_log (created_at);

-- Blog posts announced through Buffer (R5).
CREATE TABLE social_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_url TEXT NOT NULL,
  world TEXT NOT NULL,
  channel TEXT NOT NULL,
  buffer_post_id TEXT,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  error TEXT
);
CREATE UNIQUE INDEX social_posts_item_channel ON social_posts (item_url, channel);

-- Page views and click events as daily counts, never linked to a person (R6).
CREATE TABLE views_daily (
  date TEXT NOT NULL,
  world TEXT NOT NULL,
  path TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (date, world, path)
);
CREATE TABLE events_daily (
  date TEXT NOT NULL,
  world TEXT NOT NULL,
  path TEXT NOT NULL,
  event TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (date, world, path, event)
);

-- The last run of each scheduled job, for /health and the owner digest.
CREATE TABLE jobs (
  name TEXT PRIMARY KEY,
  last_run_at TEXT NOT NULL,
  last_result TEXT NOT NULL
);

-- Per-IP request counts for the form rate limit. The IP is stored only as a salted hash, and rows
-- older than a day are deleted by the hourly job.
CREATE TABLE rate_limits (
  key TEXT NOT NULL,
  window_start TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (key, window_start)
);
