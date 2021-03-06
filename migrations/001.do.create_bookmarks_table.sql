-- Creating the table
create table if not exists bookmarks
    (
        id integer primary key generated by default as identity,
        title text not null,
        url text not null unique,
        description text default '',
        rating numeric not null constraint rating_limit check (rating >= 0 and rating <= 5)
    );