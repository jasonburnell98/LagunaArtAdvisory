-- ─────────────────────────────────────────────────────────────────────────────
-- Laguna Art Advisory — Artworks Table
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
-- ─────────────────────────────────────────────────────────────────────────────

-- Create table
CREATE TABLE IF NOT EXISTS artworks (
  id                   TEXT PRIMARY KEY,
  title                TEXT,
  artist               TEXT NOT NULL,
  year                 INTEGER,
  medium               TEXT NOT NULL,
  dimensions           TEXT,
  sn                   TEXT,
  image                TEXT NOT NULL,
  price                INTEGER,        -- USD cents; NULL = inquire to purchase
  sold                 BOOLEAN NOT NULL DEFAULT FALSE,
  sold_at              TIMESTAMPTZ,
  sold_session_id      TEXT,
  sold_amount          INTEGER,
  sold_customer_email  TEXT,
  display_order        INTEGER NOT NULL DEFAULT 0,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read artworks (gallery is public)
CREATE POLICY "Public read artworks"
  ON artworks FOR SELECT TO anon USING (true);

-- ── Seed: Alec Xavier ─────────────────────────────────────────────────────────
INSERT INTO artworks (id, title, artist, year, medium, dimensions, sn, image, price, display_order)
VALUES
  ('ax-1',  'Dawns Return',            'Alec Xavier', 2024, 'Acrylic/Canvas', '40x50', 'SN/2024.001.01',  '/artists/alec_xavier/dawns_return.JPG',                NULL,   1),
  ('ax-2',  'ASK',                     'Alec Xavier', 2026, 'Acrylic/Canvas', '30x40', 'SN/2026.001.01',  '/artists/alec_xavier/ASK.JPG',                         NULL,   2),
  ('ax-3',  'Sections',                'Alec Xavier', 2021, 'Acrylic/Canvas', '24x36', 'SN/2022.002.012', '/artists/alec_xavier/sections.JPG',                    180000, 3),
  ('ax-4',  'Palms',                   'Alec Xavier', 2025, 'Acrylic/Canvas', '24x18', 'SN/2025.001.01',  '/artists/alec_xavier/palms.JPG',                       120000, 4),
  ('ax-5',  'Springs',                 'Alec Xavier', 2025, 'Acrylic/Canvas', '28x22', 'SN/2025.001.02',  '/artists/alec_xavier/springs.JPG',                     150000, 5),
  ('ax-6',  'Amigo Room',              'Alec Xavier', 2025, 'Acrylic/Canvas', '48x24', 'SN/2025.001.03',  '/artists/alec_xavier/amigo_room.JPG',                  NULL,   6),
  ('ax-7',  'Fatal Widow',             'Alec Xavier', 2025, 'Acrylic/Canvas', '24x36', 'SN/2025.001.03',  '/artists/alec_xavier/fatal_window.JPG',                180000, 7),
  ('ax-8',  'Lateral',                 'Alec Xavier', 2025, 'Acrylic/Canvas', '18x24', 'SN/2025.001.05',  '/artists/alec_xavier/lateral.JPG',                     120000, 8),
  ('ax-9',  'Tres Palms',              'Alec Xavier', 2025, 'Acrylic/Canvas', '18x24', 'SN/2025.001.06',  '/artists/alec_xavier/tres_palms.JPG',                  120000, 9),
  ('ax-10', 'Minds Alter',             'Alec Xavier', 2025, 'Acrylic/Canvas', '18x24', 'SN/2025.001.07',  '/artists/alec_xavier/minds_alter.JPG',                 120000, 10),
  ('ax-11', 'Sums',                    'Alec Xavier', 2025, 'Acrylic/Canvas', '18x24', 'SN/2025.001.08',  '/artists/alec_xavier/sums.JPG',                        120000, 11),
  ('ax-12', 'Cinema',                  'Alec Xavier', 2025, 'Acrylic/Canvas', '24x36', 'SN/2024.001.11',  '/artists/alec_xavier/cinema.JPG',                      NULL,   12),
  ('ax-13', 'Ballerina',               'Alec Xavier', 2026, 'Acrylic/Canvas',  NULL,   'SN/2026.001.12',  '/artists/alec_xavier/ballerina.JPG',                   NULL,   13),
  ('ax-14', 'Saints',                  'Alec Xavier',  NULL, 'Oil/Canvas',     NULL,   'SN/2026.001.13',  '/artists/alec_xavier/saints.JPG',                      NULL,   14),
  ('ax-15', 'Opis',                    'Alec Xavier',  NULL, 'Acrylic/Canvas', NULL,   'SN/2026.001.13',  '/artists/alec_xavier/Opis.JPG',                        NULL,   15),
  ('ax-16', 'Infinite Human Framed 9', 'Alec Xavier', 2020, 'Digital Art',   '17x30', 'SN/2020.339.58',  '/artists/alec_xavier/infinite_human_sn_2020_339_58.JPG', 80000, 16),
  ('ax-17', 'Infinite Human Framed 10','Alec Xavier', 2020, 'Digital Art',   '17x30', 'SN/2020.339.59',  '/artists/alec_xavier/infinite_human_sn_2020_339_59.JPG', 80000, 17)
ON CONFLICT (id) DO NOTHING;

-- ── Seed: Emily O'Flaherty ────────────────────────────────────────────────────
INSERT INTO artworks (id, title, artist, year, medium, dimensions, sn, image, price, display_order)
VALUES
  ('eo-1', NULL, 'Emily O''Flaherty', 2026, 'Oil/Canvas',     '22x28', NULL,              '/artists/emily_oflaherty/oil_canvas_22_28_1.JPG', NULL, 18),
  ('eo-2', NULL, 'Emily O''Flaherty', 2026, 'Oil/Canvas',     '22x28', NULL,              '/artists/emily_oflaherty/oil_canvas_22_28_2.JPG', NULL, 19),
  ('eo-3', NULL, 'Emily O''Flaherty', 2026, 'Acrylic/Canvas', '20x24', 'SN/2020.339.52', '/artists/emily_oflaherty/oil_canvas_20_24.JPG',   NULL, 20),
  ('eo-4', NULL, 'Emily O''Flaherty', 2026, 'Oil/Canvas',     '36x24', NULL,              '/artists/emily_oflaherty/oil_canvas_36_24.JPG',   NULL, 21)
ON CONFLICT (id) DO NOTHING;

-- ── Seed: Greg Urquhart ───────────────────────────────────────────────────────
INSERT INTO artworks (id, title, artist, year, medium, dimensions, sn, image, price, display_order)
VALUES
  ('gu-1', 'Flock Mentality — Yellow', 'Greg Urquhart', 2026, 'Resin on Wood Panel',               '16x20', NULL, '/artists/greg_urquhart/A_yellow_duck.jpeg',  50000, 22),
  ('gu-2', 'Duck Supreme',             'Greg Urquhart', 2026, 'Aluminum with Welded Base',         '8x10',  'Edition 1/12', '/artists/greg_urquhart/AA_metal_duck.jpeg',  33300, 23),
  ('gu-3', 'Orange Crush — Orange',    'Greg Urquhart', 2025, 'Resin on Wood Panel',               '12x18', NULL, '/artists/greg_urquhart/B_hot_wheels.jpeg',   42500, 24),
  ('gu-4', 'Flock Mentality — White',  'Greg Urquhart', 2025, 'Resin on Wood Panel, Framed',       '15x20', NULL, '/artists/greg_urquhart/C_white_duck.jpeg',   45000, 25),
  ('gu-5', 'Chew On This — Pink',      'Greg Urquhart', 2026, 'Resin on Wood Panel',               '16x24', NULL, '/artists/greg_urquhart/D_bazooka_joe.jpeg',  47500, 26),
  ('gu-6', 'Flock Mentality — Red',    'Greg Urquhart', 2025, 'Resin on Wood Panel, Framed',       '13x19', NULL, '/artists/greg_urquhart/E_red_duck.jpeg',     42500, 27)
ON CONFLICT (id) DO NOTHING;

-- ── Seed: Scott Troxel ────────────────────────────────────────────────────────
-- Retro-futurist wooden sculptures — Laguna "Small Pops" series.
-- Dimensions are H x W x D in inches; prices from the artist's price sheet.
INSERT INTO artworks (id, title, artist, year, medium, dimensions, sn, image, price, display_order)
VALUES
  ('st-1',  'Two Two',     'Scott Troxel', 2026, 'Pigmented lacquer and enamel on solid birch',             '20x11x1.75',     NULL, '/artists/scott_troxel/two_two.jpg',          180000, 28),
  ('st-2',  'Flowmeter',   'Scott Troxel', 2024, 'Pigmented satin lacquer on solid maple',                   '14.5x9.75x2',   NULL, '/artists/scott_troxel/flowmetermain.jpg',    210000, 29),
  ('st-3',  'Lomi',        'Scott Troxel', 2026, 'Epoxy resin and mica powder on poplar',                    '23x12x2',       NULL, '/artists/scott_troxel/lomi_main.jpg',        270000, 30),
  ('st-4',  'Metro',       'Scott Troxel', 2026, 'Pigmented lacquer on poplar',                              '11.25x12x2',    NULL, '/artists/scott_troxel/metro.jpg',            160000, 31),
  ('st-5',  'Sungate II',  'Scott Troxel', 2026, 'Pigmented lacquer on poplar',                              '13x8x2',        NULL, '/artists/scott_troxel/sungateii_main.jpg',   160000, 32),
  ('st-6',  'Hope',        'Scott Troxel', 2026, 'Epoxy resin and mica powder on poplar',                    '15.25x14.5x2',  NULL, '/artists/scott_troxel/hopemain.jpg',         260000, 33),
  ('st-7',  'Lucky',       'Scott Troxel', 2025, 'Pigmented lacquer on MDF and poplar with metallic enamel', '14x13.5x2',     NULL, '/artists/scott_troxel/luckymain.jpeg',       220000, 34),
  ('st-8',  'Refresher',   'Scott Troxel', 2023, 'Acrylic and texture on solid maple, matte clear coat',     '15.5x14x2.25',  NULL, '/artists/scott_troxel/refreshermain.jpg',    190000, 35),
  ('st-9',  'TwoBlues',    'Scott Troxel', 2024, 'Pigmented satin lacquer on solid maple',                   '13.25x9x2',     NULL, '/artists/scott_troxel/twoblues.jpg',         200000, 36),
  ('st-10', 'Penna',       'Scott Troxel', 2024, 'Pigmented satin lacquer on solid poplar',                  '9x15.5x2',      NULL, '/artists/scott_troxel/pennamain.jpeg',       220000, 37),
  ('st-11', 'Waikiki',     'Scott Troxel', 2024, 'Acrylic and texture on solid maple with mahogany',         '14x11x5',       NULL, '/artists/scott_troxel/waikikimain.jpg',      195000, 38)
ON CONFLICT (id) DO NOTHING;

-- ── Seed: Thomas Brady ────────────────────────────────────────────────────────
-- Oil on panel paintings capturing the poetry of everyday life.
-- Prices include shipping in a wooden crate to protect the surface.
INSERT INTO artworks (id, title, artist, year, medium, dimensions, sn, image, price, display_order)
VALUES
  ('tb-1',  'Curve in the Road',          'Thomas Brady', 2020, 'Oil/Panel', '34x53',   NULL, '/artists/thomas_brady/curve_in_the_road_34x53_2020.jpg',        730000, 39),
  ('tb-2',  'BV by Hardee''s',            'Thomas Brady', 2025, 'Oil/Panel', '35x47',   NULL, '/artists/thomas_brady/bv_by_hardees_35x47.jpg',                 686000, 40),
  ('tb-3',  'Lady at Hardees',            'Thomas Brady', 2025, 'Oil/Panel', '42x32',   NULL, '/artists/thomas_brady/lady_at_hardees_42x32.jpg',               630000, 41),
  ('tb-4',  'Landscape with Telephone Pole', 'Thomas Brady', 2017, 'Oil/Panel', '30x43.5', NULL, '/artists/thomas_brady/landscape_with_telephone_pole_30x43.5.jpg', 630000, 42),
  ('tb-5',  'Olney Couple',               'Thomas Brady', 2023, 'Oil/Panel', '44x50.5', NULL, '/artists/thomas_brady/olney_couple_44x50.5.jpg',                770000, 43),
  ('tb-6',  'Rita''s',                    'Thomas Brady', 2024, 'Oil/Panel', '39x45',   NULL, '/artists/thomas_brady/ritas_by_walgreens_39x45.jpg',            700000, 44),
  ('tb-7',  'Stewardburg Road',           'Thomas Brady', 2025, 'Oil/Panel', '31x47',   NULL, '/artists/thomas_brady/stewardburg_road_31x47.jpg',              660000, 45),
  ('tb-8',  'Striped Fields',             'Thomas Brady', 2019, 'Oil/Panel', '38x51',   NULL, '/artists/thomas_brady/striped_fields_19_38x51.jpg',             NULL,   46),
  ('tb-9',  'The DC Highway',             'Thomas Brady', 2016, 'Oil/Panel', '31x42.5', NULL, '/artists/thomas_brady/the_dc_highway_31x42.5.jpg',              620000, 47),
  ('tb-10', 'The Lexington Restaurant',   'Thomas Brady', 2023, 'Oil/Panel', '42x40',   NULL, '/artists/thomas_brady/the_lexington_restaurant_42x40_23.jpg',   680000, 48),
  ('tb-11', 'The Train Station',          'Thomas Brady', 2024, 'Oil/Panel', '35x47',   NULL, '/artists/thomas_brady/the_train_station_35x47.jpg',             686000, 49),
  ('tb-12', 'VMI',                        'Thomas Brady', 2023, 'Oil/Panel', '35x45',   NULL, '/artists/thomas_brady/vmi_35x45_23.jpg',                        670000, 50)
ON CONFLICT (id) DO NOTHING;
