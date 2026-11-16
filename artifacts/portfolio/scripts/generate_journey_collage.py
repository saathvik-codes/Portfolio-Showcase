import os
import random
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

# -------------------------------------------------------------
# PALETTE DEFINITION (Per illustrations.txt)
# -------------------------------------------------------------
CREAM = (247, 244, 236)
TERRACOTTA = (180, 83, 42)
TEAL = (47, 107, 102)
MUSTARD = (217, 155, 38)
KRAFT_BROWN = (166, 124, 82)
KRAFT_LIGHT = (196, 164, 124)
SKIN_SAATHVIK = (212, 155, 114)
SKIN_LIGHT = (235, 195, 165)
SKIN_DEEP = (168, 114, 78)
BLACK_PEN = (26, 26, 26)
WHITE_PAPER = (252, 250, 245)
GREY_PAPER = (155, 160, 165)

# Seed for deterministic artisanal cutouts
random.seed(42)
np.random.seed(42)

class CollageRenderer:
    def __init__(self, width, height, seed=42):
        self.w = width
        self.h = height
        self.rng = random.Random(seed)
        self.canvas = self._create_paper_canvas()
        self.pen_overlay = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        self.pen_draw = ImageDraw.Draw(self.pen_overlay)

    def _create_paper_canvas(self):
        canvas = Image.new('RGBA', (self.w, self.h), CREAM + (255,))
        # Multi-frequency fine paper noise
        noise = np.random.normal(0, 3.5, (self.h, self.w)).astype(np.int16)
        arr = np.array(canvas, dtype=np.int16)
        for c in range(3):
            arr[:, :, c] = np.clip(arr[:, :, c] + noise, 0, 255)
        # Subtle warm edge vignette
        res = Image.fromarray(arr.astype(np.uint8))
        d = ImageDraw.Draw(res, 'RGBA')
        for i in range(25):
            alpha = int((25 - i) * 1.8)
            d.rectangle([i, i, self.w - i, self.h - i], outline=(210, 195, 175, alpha), width=1)
        return res

    def scissor_pts(self, pts, jitter=1.8, num_sub=2):
        res = []
        for i in range(len(pts)):
            p1 = pts[i]
            p2 = pts[(i + 1) % len(pts)]
            res.append(p1)
            for s in range(1, num_sub):
                t = s / num_sub
                mx = p1[0] * (1 - t) + p2[0] * t + self.rng.uniform(-jitter, jitter)
                my = p1[1] * (1 - t) + p2[1] * t + self.rng.uniform(-jitter, jitter)
                res.append((mx, my))
        return res

    def scissor_ellipse(self, cx, cy, rx, ry, points=36, jitter=1.8):
        pts = []
        for i in range(points):
            angle = 2 * math.pi * i / points
            r_jit_x = rx + self.rng.uniform(-jitter, jitter)
            r_jit_y = ry + self.rng.uniform(-jitter, jitter)
            pts.append((cx + r_jit_x * math.cos(angle), cy + r_jit_y * math.sin(angle)))
        return pts

    def add_cutout(self, polygon_pts, fill, depth=1, pen_outline=None):
        mask = Image.new('L', (self.w, self.h), 0)
        d_m = ImageDraw.Draw(mask)
        d_m.polygon(polygon_pts, fill=255)

        # Drop shadow properties based on paper layer height
        dx = depth * 3
        dy = depth * 4 + 2
        blur = depth * 3 + 2
        alpha = min(75, 30 + depth * 12)

        shadow_mask = mask.filter(ImageFilter.GaussianBlur(blur))
        shadow_layer = Image.new('RGBA', (self.w, self.h), (35, 25, 20, alpha))
        shadow_canvas = Image.new('RGBA', (self.w, self.h), (0, 0, 0, 0))
        shadow_canvas.paste(shadow_layer, (dx, dy), shadow_mask)

        self.canvas = Image.alpha_composite(self.canvas, shadow_canvas)

        # Shape layer
        shape_layer = Image.new('RGBA', (self.w, self.h), fill + (255,))
        self.canvas.paste(shape_layer, (0, 0), mask)

        if pen_outline:
            self.pen_draw.polygon(polygon_pts, outline=pen_outline, width=2)

    def add_rectangle(self, x, y, w, h, fill, depth=1, rot_deg=0, pen_outline=None):
        cx, cy = x + w / 2, y + h / 2
        hw, hh = w / 2, h / 2
        rad = math.radians(rot_deg)
        cos_r, sin_r = math.cos(rad), math.sin(rad)

        base_corners = [(-hw, -hh), (hw, -hh), (hw, hh), (-hw, hh)]
        rotated_corners = []
        for bx, by in base_corners:
            rx = cx + bx * cos_r - by * sin_r
            ry = cy + bx * sin_r + by * cos_r
            rotated_corners.append((rx, ry))

        pts = self.scissor_pts(rotated_corners, jitter=1.5, num_sub=3)
        self.add_cutout(pts, fill, depth=depth, pen_outline=pen_outline)

    def draw_cup(self, cx, cy, scale=1.0, color=TERRACOTTA, depth=3):
        # Ceramic cup paper shape
        w, h = 32 * scale, 38 * scale
        cup_pts = self.scissor_pts([
            (cx - w, cy - h), (cx + w, cy - h),
            (cx + w * 0.82, cy + h), (cx - w * 0.82, cy + h)
        ], jitter=1.2)
        self.add_cutout(cup_pts, color, depth=depth)
        # Handle
        handle_pts = self.scissor_pts([
            (cx + w * 0.9, cy - h * 0.6), (cx + w * 1.5, cy - h * 0.4),
            (cx + w * 1.5, cy + h * 0.4), (cx + w * 0.8, cy + h * 0.6)
        ], jitter=1.0)
        self.add_cutout(handle_pts, color, depth=depth - 1)
        # Dark coffee inside top
        top_pts = self.scissor_ellipse(cx, cy - h + 2, w * 0.9, h * 0.22, points=18)
        self.add_cutout(top_pts, (60, 40, 30), depth=depth)

    def draw_saathvik(self, cx, cy, scale=1.0, pose='sitting', action='table', depth_base=3):
        # Character generator: Saathvik (messy black wave hair, round glasses, teal overshirt, cream tee, terracotta sneakers)
        # Torso
        tw, th = 130 * scale, 170 * scale
        torso_y = cy - th / 2
        torso_pts = self.scissor_pts([
            (cx - tw / 2, torso_y), (cx + tw / 2, torso_y),
            (cx + tw * 0.45, torso_y + th), (cx - tw * 0.45, torso_y + th)
        ], jitter=2.0)
        self.add_cutout(torso_pts, TEAL, depth=depth_base + 1)

        # Cream tee inner triangle
        tee_pts = self.scissor_pts([
            (cx - tw * 0.2, torso_y), (cx + tw * 0.2, torso_y),
            (cx + tw * 0.12, torso_y + th * 0.65), (cx - tw * 0.12, torso_y + th * 0.65)
        ], jitter=1.2)
        self.add_cutout(tee_pts, WHITE_PAPER, depth=depth_base + 2)

        # Head: oval
        head_w, head_h = 58 * scale, 72 * scale
        head_cy = torso_y - head_h * 0.85
        head_pts = self.scissor_ellipse(cx, head_cy, head_w, head_h, 32, jitter=1.5)
        self.add_cutout(head_pts, SKIN_SAATHVIK, depth=depth_base + 3)

        # Hair: black paper messy wave cut
        hw, hh = head_w * 1.15, head_h * 0.95
        hair_pts = self.scissor_pts([
            (cx - hw, head_cy - hh * 0.1), (cx - hw * 0.9, head_cy - hh),
            (cx - hw * 0.3, head_cy - hh * 1.25), (cx + hw * 0.2, head_cy - hh * 1.2),
            (cx + hw * 0.85, head_cy - hh * 0.95), (cx + hw * 1.05, head_cy - hh * 0.1),
            (cx + hw * 0.8, head_cy - hh * 0.2), (cx + hw * 0.4, head_cy - hh * 0.5),
            (cx - hw * 0.2, head_cy - hh * 0.45), (cx - hw * 0.7, head_cy - hh * 0.15)
        ], jitter=2.2, num_sub=3)
        self.add_cutout(hair_pts, BLACK_PEN, depth=depth_base + 4)

        # Glasses & Face with black felt pen
        eye_y = head_cy - head_h * 0.05
        # Dot eyes
        self.pen_draw.ellipse([cx - 24 * scale, eye_y - 3, cx - 18 * scale, eye_y + 3], fill=BLACK_PEN)
        self.pen_draw.ellipse([cx + 18 * scale, eye_y - 3, cx + 24 * scale, eye_y + 3], fill=BLACK_PEN)
        # Round glasses
        gr = 18 * scale
        self.pen_draw.ellipse([cx - 21 * scale - gr, eye_y - gr, cx - 21 * scale + gr, eye_y + gr], outline=BLACK_PEN, width=int(2.5 * scale))
        self.pen_draw.ellipse([cx + 21 * scale - gr, eye_y - gr, cx + 21 * scale + gr, eye_y + gr], outline=BLACK_PEN, width=int(2.5 * scale))
        self.pen_draw.line([(cx - 21 * scale + gr, eye_y), (cx + 21 * scale - gr, eye_y)], fill=BLACK_PEN, width=int(2.5 * scale))
        # Pen smile
        self.pen_draw.line([(cx - 10 * scale, head_cy + head_h * 0.42), (cx + 10 * scale, head_cy + head_h * 0.45)], fill=BLACK_PEN, width=int(2 * scale))

        # Arms and action
        if action == 'table':
            arm_pts = self.scissor_pts([
                (cx - tw * 0.45, torso_y + 20), (cx - tw * 0.8, torso_y + th * 0.7),
                (cx - tw * 0.2, torso_y + th * 0.9), (cx - tw * 0.1, torso_y + th * 0.8)
            ], jitter=1.5)
            self.add_cutout(arm_pts, TEAL, depth=depth_base + 2)
            # Mitten hand
            hand_pts = self.scissor_ellipse(cx - tw * 0.1, torso_y + th * 0.85, 18 * scale, 15 * scale, 16)
            self.add_cutout(hand_pts, SKIN_SAATHVIK, depth=depth_base + 3)

        elif action == 'pointing' or action == 'waving':
            arm_pts = self.scissor_pts([
                (cx + tw * 0.4, torso_y + 20), (cx + tw * 0.9, torso_y - 40),
                (cx + tw * 0.75, torso_y - 55), (cx + tw * 0.35, torso_y + 10)
            ], jitter=1.5)
            self.add_cutout(arm_pts, TEAL, depth=depth_base + 2)
            hand_pts = self.scissor_ellipse(cx + tw * 0.85, torso_y - 60, 20 * scale, 18 * scale, 16)
            self.add_cutout(hand_pts, SKIN_SAATHVIK, depth=depth_base + 3)

        # Legs & Terracotta sneakers
        if pose == 'standing':
            leg_h = 180 * scale
            leg1 = self.scissor_pts([(cx - 45 * scale, torso_y + th), (cx - 15 * scale, torso_y + th), (cx - 18 * scale, torso_y + th + leg_h), (cx - 48 * scale, torso_y + th + leg_h)])
            leg2 = self.scissor_pts([(cx + 15 * scale, torso_y + th), (cx + 45 * scale, torso_y + th), (cx + 48 * scale, torso_y + th + leg_h), (cx + 18 * scale, torso_y + th + leg_h)])
            self.add_cutout(leg1, WHITE_PAPER, depth=depth_base)
            self.add_cutout(leg2, WHITE_PAPER, depth=depth_base)
            # Sneakers
            shoe1 = self.scissor_pts([(cx - 55 * scale, torso_y + th + leg_h), (cx - 5 * scale, torso_y + th + leg_h), (cx - 5 * scale, torso_y + th + leg_h + 30), (cx - 65 * scale, torso_y + th + leg_h + 30)])
            shoe2 = self.scissor_pts([(cx + 10 * scale, torso_y + th + leg_h), (cx + 60 * scale, torso_y + th + leg_h), (cx + 70 * scale, torso_y + th + leg_h + 30), (cx + 10 * scale, torso_y + th + leg_h + 30)])
            self.add_cutout(shoe1, TERRACOTTA, depth=depth_base + 1)
            self.add_cutout(shoe2, TERRACOTTA, depth=depth_base + 1)

    def draw_other_person(self, cx, cy, scale=1.0, color=MUSTARD, hair_color=KRAFT_BROWN, hair_style='short', skin=SKIN_LIGHT, depth_base=2):
        tw, th = 120 * scale, 165 * scale
        torso_y = cy - th / 2
        torso_pts = self.scissor_pts([
            (cx - tw / 2, torso_y), (cx + tw / 2, torso_y),
            (cx + tw * 0.42, torso_y + th), (cx - tw * 0.42, torso_y + th)
        ], jitter=2.0)
        self.add_cutout(torso_pts, color, depth=depth_base)

        head_w, head_h = 54 * scale, 68 * scale
        head_cy = torso_y - head_h * 0.85
        head_pts = self.scissor_ellipse(cx, head_cy, head_w, head_h, 32, jitter=1.5)
        self.add_cutout(head_pts, skin, depth=depth_base + 2)

        hw, hh = head_w * 1.15, head_h * 0.95
        if hair_style == 'short':
            hair_pts = self.scissor_pts([
                (cx - hw, head_cy), (cx - hw * 0.8, head_cy - hh),
                (cx, head_cy - hh * 1.15), (cx + hw * 0.8, head_cy - hh),
                (cx + hw, head_cy), (cx + hw * 0.7, head_cy - hh * 0.3),
                (cx - hw * 0.7, head_cy - hh * 0.3)
            ], jitter=2.0)
        else: # bob / longer
            hair_pts = self.scissor_pts([
                (cx - hw * 1.1, head_cy + hh * 0.4), (cx - hw * 0.8, head_cy - hh * 1.1),
                (cx + hw * 0.8, head_cy - hh * 1.1), (cx + hw * 1.1, head_cy + hh * 0.4),
                (cx + hw * 0.6, head_cy - hh * 0.2), (cx - hw * 0.6, head_cy - hh * 0.2)
            ], jitter=2.0)
        self.add_cutout(hair_pts, hair_color, depth=depth_base + 3)

        # Dot eyes & simple pen mouth
        eye_y = head_cy - head_h * 0.05
        self.pen_draw.ellipse([cx - 18 * scale, eye_y - 3, cx - 12 * scale, eye_y + 3], fill=BLACK_PEN)
        self.pen_draw.ellipse([cx + 12 * scale, eye_y - 3, cx + 18 * scale, eye_y + 3], fill=BLACK_PEN)
        self.pen_draw.line([(cx - 8 * scale, head_cy + head_h * 0.4), (cx + 8 * scale, head_cy + head_h * 0.42)], fill=BLACK_PEN, width=2)

    def finalize(self):
        # Composite felt-tip pen lines over canvas
        final = Image.alpha_composite(self.canvas, self.pen_overlay)
        return final.convert('RGB')

# -------------------------------------------------------------
# BUILDERS FOR EACH OF THE 11 ILLUSTRATIONS
# -------------------------------------------------------------

def render_hero_convo():
    # 1. hero-convo.jpg (1:1 square)
    r = CollageRenderer(1400, 1400, seed=101)

    # Kraft paper circular table
    table_pts = r.scissor_ellipse(700, 960, 460, 280, 48, jitter=3.0)
    r.add_cutout(table_pts, KRAFT_LIGHT, depth=2)
    # Table center leg
    r.add_cutout(r.scissor_pts([(650, 960), (750, 960), (740, 1340), (660, 1340)]), KRAFT_BROWN, depth=1)

    # Saathvik (left side)
    r.draw_saathvik(cx=440, cy=780, scale=1.15, pose='sitting', action='table', depth_base=3)

    # Founder (right side)
    r.draw_other_person(cx=960, cy=790, scale=1.15, color=MUSTARD, hair_color=KRAFT_BROWN, hair_style='bob', depth_base=3)

    # Paper notebook on table between them
    nb_pts = r.scissor_pts([(560, 880), (840, 870), (850, 1040), (550, 1050)], jitter=1.5)
    r.add_cutout(nb_pts, WHITE_PAPER, depth=4)

    # Three cut paper diagram boxes joined by arrows cut from black paper
    r.add_rectangle(590, 910, 60, 45, TEAL, depth=5)
    r.add_rectangle(740, 905, 60, 45, TERRACOTTA, depth=5)
    r.add_rectangle(670, 975, 65, 45, MUSTARD, depth=5)
    # Black paper arrows
    r.pen_draw.line([(655, 932), (735, 928)], fill=BLACK_PEN, width=3)
    r.pen_draw.line([(735, 928), (725, 920)], fill=BLACK_PEN, width=3)
    r.pen_draw.line([(710, 950), (700, 975)], fill=BLACK_PEN, width=3)

    # Two ceramic cups on table
    r.draw_cup(cx=510, cy=940, scale=1.1, color=TERRACOTTA, depth=5)
    r.draw_cup(cx=890, cy=950, scale=1.1, color=TEAL, depth=5)

    return r.finalize()

def render_about_convo():
    # 2. about-convo.jpg (4:5 vertical)
    r = CollageRenderer(1200, 1500, seed=102)

    # Board / Wall panel in light kraft/cream
    board_pts = r.scissor_pts([(160, 220), (860, 220), (850, 880), (150, 880)], jitter=2.0)
    r.add_cutout(board_pts, WHITE_PAPER, depth=1, pen_outline=BLACK_PEN)

    # Cut paper diagram rectangles and arrows pinned to board
    boxes = [
        (220, 280, 110, 70, TEAL),
        (400, 290, 120, 75, MUSTARD),
        (580, 280, 110, 70, TERRACOTTA),
        (300, 430, 130, 80, KRAFT_LIGHT),
        (490, 440, 120, 75, TEAL),
        (390, 590, 140, 85, TERRACOTTA),
        (230, 580, 100, 70, MUSTARD),
    ]
    for bx, by, bw, bh, col in boxes:
        r.add_rectangle(bx, by, bw, bh, col, depth=2)
    # Pen connecting arrows
    r.pen_draw.line([(335, 315), (395, 325)], fill=BLACK_PEN, width=3)
    r.pen_draw.line([(525, 325), (575, 315)], fill=BLACK_PEN, width=3)
    r.pen_draw.line([(460, 370), (370, 425)], fill=BLACK_PEN, width=3)
    r.pen_draw.line([(435, 515), (460, 585)], fill=BLACK_PEN, width=3)

    # Saathvik (standing, reaching to board with paper rectangle)
    r.draw_saathvik(cx=560, cy=1050, scale=1.2, pose='standing', action='pointing', depth_base=3)
    # Paper rectangle in his hand
    r.add_rectangle(640, 780, 95, 60, MUSTARD, depth=5)

    # Designer (standing on right, holding a paper piece to hand him)
    r.draw_other_person(cx=920, cy=1070, scale=1.18, color=KRAFT_BROWN, hair_color=BLACK_PEN, hair_style='short', depth_base=3)
    r.add_rectangle(820, 950, 90, 55, TEAL, depth=5)

    # Stool with paper cat in bottom left
    stool_top = r.scissor_ellipse(240, 1280, 110, 40, 24)
    r.add_cutout(stool_top, KRAFT_LIGHT, depth=2)
    r.add_cutout(r.scissor_pts([(180, 1280), (195, 1450), (210, 1450), (195, 1280)]), KRAFT_BROWN, depth=1)
    r.add_cutout(r.scissor_pts([(280, 1280), (265, 1450), (250, 1450), (265, 1280)]), KRAFT_BROWN, depth=1)

    # Cat curled asleep on stool (terracotta paper cut with ears and tail)
    cat_body = r.scissor_ellipse(240, 1260, 75, 45, 24)
    r.add_cutout(cat_body, TERRACOTTA, depth=3)
    cat_head = r.scissor_ellipse(190, 1250, 32, 28, 18)
    r.add_cutout(cat_head, TERRACOTTA, depth=4)
    # Ears
    ear1 = r.scissor_pts([(170, 1235), (180, 1215), (195, 1230)])
    ear2 = r.scissor_pts([(195, 1230), (210, 1215), (218, 1235)])
    r.add_cutout(ear1, TERRACOTTA, depth=4)
    r.add_cutout(ear2, TERRACOTTA, depth=4)
    # Tail & face lines
    r.pen_draw.arc([165, 1240, 185, 1255], 0, 180, fill=BLACK_PEN, width=2)
    r.pen_draw.line([(290, 1270), (320, 1250), (330, 1270)], fill=BLACK_PEN, width=3)

    return r.finalize()

def render_proj_quorumdb():
    # 3. proj-quorumdb.jpg (4:5)
    r = CollageRenderer(1200, 1500, seed=103)

    # Five server boxes in a row
    # Server 1 to 5
    # One has its plug pulled (terracotta cable dangling); other 4 lean together
    sw, sh = 135, 520
    sy = 650

    # Server 1 (leaning right 4 deg)
    r.add_rectangle(180, sy, sw, sh, TEAL, depth=2, rot_deg=4)
    # Server 2 (leaning right 6 deg toward gap)
    r.add_rectangle(340, sy - 10, sw, sh, KRAFT_LIGHT, depth=2, rot_deg=7)

    # Server 3: The pulled node (slightly displaced down, cord dangling)
    r.add_rectangle(520, sy + 60, sw, sh * 0.9, GREY_PAPER, depth=1)
    # Pull socket & dangling terracotta cable
    r.pen_draw.ellipse([570, sy + 380, 595, sy + 405], fill=BLACK_PEN)
    # Long dangling wavy terracotta paper cable
    cable_pts = [(582, sy + 400), (560, sy + 480), (620, sy + 560), (590, sy + 650), (640, sy + 720)]
    for i in range(len(cable_pts) - 1):
        r.pen_draw.line([cable_pts[i], cable_pts[i+1]], fill=TERRACOTTA, width=6)
    # Loose plug head
    r.add_rectangle(630, sy + 720, 35, 25, BLACK_PEN, depth=3)

    # Server 4 (leaning left 7 deg holding gap)
    r.add_rectangle(710, sy - 15, sw, sh, KRAFT_LIGHT, depth=2, rot_deg=-7)
    # Server 5 (leaning left 4 deg)
    r.add_rectangle(870, sy, sw, sh, TEAL, depth=2, rot_deg=-4)

    # Status LED strips cut from mustard/white paper on all active servers
    for x_s in [195, 355, 725, 885]:
        for y_led in range(sy + 40, sy + 440, 50):
            r.add_rectangle(x_s, y_led, 20, 12, MUSTARD, depth=3)
            r.add_rectangle(x_s + 35, y_led, 55, 12, WHITE_PAPER, depth=3)

    # Saathvik observing with laptop on stool on left foreground
    r.draw_saathvik(cx=320, cy=1200, scale=1.05, pose='standing', action='pointing', depth_base=4)
    # Little laptop cut from paper
    r.add_rectangle(410, 1140, 120, 75, KRAFT_BROWN, depth=5)
    r.add_rectangle(420, 1150, 100, 55, WHITE_PAPER, depth=6)
    # Colleague engineer on right holding the cable
    r.draw_other_person(cx=880, cy=1220, scale=1.05, color=MUSTARD, hair_color=BLACK_PEN, depth_base=4)

    return r.finalize()

def render_proj_aetherflow():
    # 4. proj-aetherflow.jpg (4:5)
    r = CollageRenderer(1200, 1500, seed=104)

    # Curved model train track cut from kraft paper
    track_pts = r.scissor_pts([(100, 820), (1100, 820), (1100, 960), (100, 960)], jitter=3.0)
    r.add_cutout(track_pts, KRAFT_LIGHT, depth=1)
    # Track cross ties with pen
    for tx in range(120, 1080, 35):
        r.pen_draw.line([(tx, 815), (tx, 965)], fill=KRAFT_BROWN, width=5)

    # Train of 8 small coloured carriages on the track
    colors_train = [TERRACOTTA, TEAL, MUSTARD, KRAFT_BROWN, TEAL, TERRACOTTA, MUSTARD, GREY_PAPER]
    car_w, car_h = 95, 75
    start_x = 130
    for idx, col in enumerate(colors_train):
        cx_c = start_x + idx * 115
        r.add_rectangle(cx_c, 810, car_w, car_h, col, depth=2)
        # Small wheels
        w1 = r.scissor_ellipse(cx_c + 20, 890, 16, 16, 16)
        w2 = r.scissor_ellipse(cx_c + car_w - 20, 890, 16, 16, 16)
        r.add_cutout(w1, BLACK_PEN, depth=3)
        r.add_cutout(w2, BLACK_PEN, depth=3)
        # Coupling link
        if idx < len(colors_train) - 1:
            r.pen_draw.line([(cx_c + car_w, 850), (cx_c + car_w + 20, 850)], fill=BLACK_PEN, width=4)

    # Saathvik leaning over inspecting with a magnifying glass
    r.draw_saathvik(cx=560, cy=580, scale=1.2, pose='standing', action='pointing', depth_base=3)

    # Cutout Magnifying Glass in hand
    mg_pts = r.scissor_ellipse(670, 710, 55, 55, 32)
    r.add_cutout(mg_pts, WHITE_PAPER, depth=5, pen_outline=BLACK_PEN)
    # Magnifier handle
    r.add_cutout(r.scissor_pts([(710, 745), (765, 805), (780, 790), (725, 730)]), TERRACOTTA, depth=4)
    # Square wave doodle inside magnifying glass!
    r.pen_draw.line([(635, 710), (650, 710), (650, 685), (675, 685), (675, 735), (700, 735), (700, 710)], fill=TEAL, width=3)

    return r.finalize()

def render_proj_onroad():
    # 5. proj-onroad.jpg (4:5)
    r = CollageRenderer(1200, 1500, seed=105)

    # Stylized paper car silhouette in deep teal
    # Car body
    car_pts = r.scissor_pts([
        (220, 820), (320, 680), (560, 680), (680, 750), (980, 760),
        (1020, 850), (980, 940), (220, 940)
    ], jitter=3.0)
    r.add_cutout(car_pts, TEAL, depth=2)
    # Windows
    win1 = r.scissor_pts([(350, 705), (530, 705), (530, 765), (380, 765)])
    win2 = r.scissor_pts([(555, 705), (670, 765), (555, 765)])
    r.add_cutout(win1, WHITE_PAPER, depth=3)
    r.add_cutout(win2, WHITE_PAPER, depth=3)
    # Wheels
    r.add_cutout(r.scissor_ellipse(380, 940, 48, 48, 24), BLACK_PEN, depth=3)
    r.add_cutout(r.scissor_ellipse(860, 940, 48, 48, 24), BLACK_PEN, depth=3)
    r.add_cutout(r.scissor_ellipse(380, 940, 22, 22, 16), WHITE_PAPER, depth=4)
    r.add_cutout(r.scissor_ellipse(860, 940, 22, 22, 16), WHITE_PAPER, depth=4)

    # Long paper receipt unrolling from roof
    receipt_pts = r.scissor_pts([
        (480, 680), (560, 680), (560, 360), (740, 340), (760, 520),
        (710, 530), (700, 400), (480, 410)
    ], jitter=2.0)
    r.add_cutout(receipt_pts, WHITE_PAPER, depth=4, pen_outline=BLACK_PEN)
    # Receipt dashed lines in pen
    for ry in range(410, 660, 25):
        r.pen_draw.line([(500, ry), (540, ry)], fill=BLACK_PEN, width=2)
    for ry in range(360, 510, 22):
        r.pen_draw.line([(725, ry), (750, ry)], fill=BLACK_PEN, width=2)

    # Shopper reading receipt on right
    r.draw_other_person(cx=840, cy=580, scale=1.1, color=MUSTARD, hair_color=KRAFT_BROWN, hair_style='bob', depth_base=4)

    # Saathvik pointing at the lines
    r.draw_saathvik(cx=360, cy=540, scale=1.1, pose='standing', action='pointing', depth_base=4)

    return r.finalize()

def render_proj_switchboard():
    # 6. proj-switchboard.jpg (4:5)
    r = CollageRenderer(1200, 1500, seed=106)

    # Large vintage telephone switchboard frame in Kraft Brown
    sb_pts = r.scissor_pts([(240, 180), (960, 180), (940, 980), (220, 980)], jitter=2.5)
    r.add_cutout(sb_pts, KRAFT_LIGHT, depth=1, pen_outline=BLACK_PEN)
    # Front angled console
    con_pts = r.scissor_pts([(180, 980), (1020, 980), (990, 1180), (150, 1180)], jitter=2.0)
    r.add_cutout(con_pts, KRAFT_BROWN, depth=2)

    # Grid of sockets
    for row in range(5):
        for col in range(9):
            sx = 310 + col * 72
            sy = 260 + row * 90
            r.add_cutout(r.scissor_ellipse(sx, sy, 14, 14, 16), BLACK_PEN, depth=2)

    # Many paper cables connecting sockets (terracotta, teal, mustard)
    cables = [
        ([(310, 260), (380, 480), (526, 440)], TERRACOTTA),
        ([(454, 350), (420, 580), (670, 350)], TEAL),
        ([(598, 260), (740, 520), (814, 440)], MUSTARD),
        ([(382, 350), (540, 680), (742, 620)], TERRACOTTA),
    ]
    for pts, col in cables:
        for i in range(len(pts) - 1):
            r.pen_draw.line([pts[i], pts[i+1]], fill=col, width=6)

    # Saathvik (left) and Bank Lead (right) plugging in a cable together
    r.draw_saathvik(cx=340, cy=1120, scale=1.1, pose='standing', action='pointing', depth_base=3)
    r.draw_other_person(cx=860, cy=1120, scale=1.1, color=MUSTARD, hair_color=GREY_PAPER, hair_style='short', depth_base=3)
    # Glasses on bank lead
    r.pen_draw.ellipse([835, 1020, 855, 1040], outline=BLACK_PEN, width=2)
    r.pen_draw.ellipse([865, 1020, 885, 1040], outline=BLACK_PEN, width=2)

    # The cable they are plugging into the center socket
    target_socket = (670, 530)
    plug_pts = [(450, 1050), (560, 950), (650, 750), target_socket]
    for i in range(len(plug_pts) - 1):
        r.pen_draw.line([plug_pts[i], plug_pts[i+1]], fill=TERRACOTTA, width=6)

    return r.finalize()

def render_proj_querymind():
    # 7. proj-querymind.jpg (4:5)
    r = CollageRenderer(1200, 1500, seed=107)

    # Large paper funnel in center in Kraft Light / Mustard
    funnel_top = r.scissor_pts([(360, 320), (840, 320), (660, 650), (540, 650)], jitter=2.5)
    r.add_cutout(funnel_top, MUSTARD, depth=2)
    funnel_spout = r.scissor_pts([(540, 650), (660, 650), (650, 820), (550, 820)], jitter=1.5)
    r.add_cutout(funnel_spout, MUSTARD, depth=2)

    # Merchandiser asking question into the funnel on the left
    r.draw_other_person(cx=260, cy=460, scale=1.1, color=TERRACOTTA, hair_color=BLACK_PEN, depth_base=3)
    # Question mark speech paper card going into funnel
    q_card = r.scissor_pts([(320, 260), (420, 240), (450, 340), (350, 360)])
    r.add_cutout(q_card, WHITE_PAPER, depth=4)
    r.pen_draw.line([(385, 275), (400, 290)], fill=BLACK_PEN, width=4)
    r.pen_draw.line([(395, 305), (395, 320)], fill=BLACK_PEN, width=4)

    # Three neat paper bar-chart strips coming out of spout into Saathvik's hands
    r.add_rectangle(520, 840, 35, 260, TEAL, depth=4)
    r.add_rectangle(580, 840, 35, 380, TERRACOTTA, depth=4)
    r.add_rectangle(640, 840, 35, 190, MUSTARD, depth=4)

    # Saathvik receiving the charts with open hands
    r.draw_saathvik(cx=840, cy=1050, scale=1.2, pose='standing', action='pointing', depth_base=5)

    return r.finalize()

def render_proj_pulse():
    # 8. proj-pulse.jpg (4:5)
    r = CollageRenderer(1200, 1500, seed=108)

    # Exit Door cut from kraft paper on the right side
    door_pts = r.scissor_pts([(920, 680), (1120, 680), (1120, 1180), (920, 1180)], jitter=2.0)
    r.add_cutout(door_pts, KRAFT_BROWN, depth=1)
    door_inner = r.scissor_pts([(950, 710), (1090, 710), (1090, 1180), (950, 1180)])
    r.add_cutout(door_inner, WHITE_PAPER, depth=2)

    # Crowd of small round paper people (dots with tiny bodies)
    r_cols = [TEAL, MUSTARD, KRAFT_LIGHT, TERRACOTTA, GREY_PAPER]
    for row in range(5):
        for col in range(7):
            px = 240 + col * 90 + random.randint(-15, 15)
            py = 720 + row * 90 + random.randint(-15, 15)
            # Body & head
            col_p = r_cols[(row * 7 + col) % len(r_cols)]
            r.add_cutout(r.scissor_ellipse(px, py, 22, 22, 16), col_p, depth=2)
            r.add_cutout(r.scissor_ellipse(px, py - 24, 14, 14, 14), SKIN_LIGHT, depth=3)

    # A few people near the edge walking toward the door
    for idx, dx in enumerate([780, 850, 930]):
        dy = 880 + idx * 40
        r.add_cutout(r.scissor_ellipse(dx, dy, 24, 24, 16), TERRACOTTA, depth=3)
        r.add_cutout(r.scissor_ellipse(dx, dy - 26, 15, 15, 14), SKIN_SAATHVIK, depth=4)

    # Balcony railing at top where Saathvik and Founder stand
    rail_pts = r.scissor_pts([(80, 480), (1120, 480), (1120, 520), (80, 520)])
    r.add_cutout(rail_pts, KRAFT_BROWN, depth=4)

    # Saathvik and Founder looking down through a paper telescope
    r.draw_other_person(cx=360, cy=380, scale=1.1, color=MUSTARD, hair_color=BLACK_PEN, depth_base=5)
    r.draw_saathvik(cx=560, cy=370, scale=1.1, pose='standing', action='pointing', depth_base=5)

    # Paper telescope
    tele_pts = r.scissor_pts([(580, 360), (760, 470), (740, 500), (560, 390)], jitter=1.5)
    r.add_cutout(tele_pts, TEAL, depth=6, pen_outline=BLACK_PEN)

    return r.finalize()

def render_proj_hybrid_llm_rbac():
    # 9. proj-hybrid-llm-rbac.jpg (4:5)
    r = CollageRenderer(1200, 1500, seed=109)

    # Large paper door in Kraft Light with frame
    door_frame = r.scissor_pts([(280, 280), (920, 280), (920, 1380), (280, 1380)], jitter=2.0)
    r.add_cutout(door_frame, KRAFT_BROWN, depth=1)
    door_pts = r.scissor_pts([(320, 320), (880, 320), (880, 1380), (320, 1380)], jitter=2.0)
    r.add_cutout(door_pts, KRAFT_LIGHT, depth=2)

    # Several padlocks of different sizes hanging on the door
    padlocks = [
        (420, 480, 70, 60, TEAL),
        (580, 450, 110, 95, TERRACOTTA),
        (760, 490, 65, 55, MUSTARD),
        (500, 660, 85, 75, KRAFT_BROWN),
        (680, 640, 90, 80, GREY_PAPER),
    ]
    for lx, ly, lw, lh, lcol in padlocks:
        # Padlock shackle arch
        r.pen_draw.arc([lx + 15, ly - lh * 0.45, lx + lw - 15, ly + lh * 0.3], 180, 360, fill=BLACK_PEN, width=6)
        # Padlock body
        r.add_rectangle(lx, ly, lw, lh, lcol, depth=3)
        # Keyhole
        r.pen_draw.ellipse([lx + lw/2 - 5, ly + lh/2 - 8, lx + lw/2 + 5, ly + lh/2 + 2], fill=BLACK_PEN)
        r.pen_draw.line([(lx + lw/2, ly + lh/2), (lx + lw/2, ly + lh/2 + 12)], fill=BLACK_PEN, width=3)

    # Security Lead on left handing paper key
    r.draw_other_person(cx=220, cy=1040, scale=1.15, color=GREY_PAPER, hair_color=BLACK_PEN, depth_base=4)

    # Paper key cut from mustard paper held out
    key_pts = r.scissor_pts([(280, 980), (390, 980), (390, 1010), (360, 1010), (360, 995), (280, 995)])
    r.add_cutout(key_pts, MUSTARD, depth=5, pen_outline=BLACK_PEN)
    r.add_cutout(r.scissor_ellipse(265, 990, 20, 20, 16), MUSTARD, depth=5)

    # Saathvik on right reaching to accept the key
    r.draw_saathvik(cx=980, cy=1050, scale=1.15, pose='standing', action='pointing', depth_base=4)

    return r.finalize()

def render_credentials_study():
    # 10. credentials-study.jpg (16:10 landscape)
    r = CollageRenderer(1600, 1000, seed=110)

    # Bookshelf background rows in Kraft
    for row_y in [180, 340]:
        shelf_pts = r.scissor_pts([(80, row_y), (1520, row_y), (1520, row_y + 18), (80, row_y + 18)])
        r.add_cutout(shelf_pts, KRAFT_BROWN, depth=1)
        # Colorful paper book spines
        cols_b = [TEAL, TERRACOTTA, MUSTARD, GREY_PAPER, KRAFT_LIGHT, WHITE_PAPER]
        bx = 100
        while bx < 1480:
            bw = random.randint(22, 45)
            bh = random.randint(85, 120)
            bcol = cols_b[random.randint(0, len(cols_b) - 1)]
            r.add_rectangle(bx, row_y - bh + 18, bw, bh, bcol, depth=2)
            bx += bw + random.randint(4, 10)

    # Carved paper owl on top right bookshelf!
    owl_body = r.scissor_ellipse(1350, 130, 35, 45, 24)
    r.add_cutout(owl_body, KRAFT_BROWN, depth=3)
    # Owl eyes (mustard circles with black dots)
    r.add_cutout(r.scissor_ellipse(1338, 115, 12, 12, 16), MUSTARD, depth=4)
    r.add_cutout(r.scissor_ellipse(1362, 115, 12, 12, 16), MUSTARD, depth=4)
    r.pen_draw.ellipse([1336, 113, 1340, 117], fill=BLACK_PEN)
    r.pen_draw.ellipse([1360, 113, 1364, 117], fill=BLACK_PEN)
    # Beak
    r.add_cutout(r.scissor_pts([(1347, 122), (1353, 122), (1350, 132)]), TERRACOTTA, depth=4)

    # Wide Library Table in Kraft Light
    table_pts = r.scissor_pts([(120, 680), (1480, 680), (1460, 960), (140, 960)], jitter=3.0)
    r.add_cutout(table_pts, KRAFT_LIGHT, depth=3)

    # Classic Banker Paper Desk Lamps with flat terracotta glow
    for lx in [380, 1220]:
        # Lamp shade in terracotta
        shade = r.scissor_pts([(lx - 70, 520), (lx + 70, 520), (lx + 55, 570), (lx - 55, 570)])
        r.add_cutout(shade, TERRACOTTA, depth=5)
        # Brass stand in mustard
        stand = r.scissor_pts([(lx - 8, 570), (lx + 8, 570), (lx + 10, 685), (lx - 10, 685)])
        r.add_cutout(stand, MUSTARD, depth=4)
        base_lamp = r.scissor_ellipse(lx, 685, 40, 15, 18)
        r.add_cutout(base_lamp, MUSTARD, depth=4)

    # Saathvik (center-left) and two classmates (center and center-right)
    r.draw_other_person(cx=560, cy=580, scale=1.05, color=MUSTARD, hair_color=KRAFT_BROWN, depth_base=4)
    r.draw_saathvik(cx=800, cy=560, scale=1.05, pose='sitting', action='table', depth_base=4)
    r.draw_other_person(cx=1040, cy=580, scale=1.05, color=GREY_PAPER, hair_color=BLACK_PEN, depth_base=4)

    # Open sketchpad on table with tree and graph doodles
    sp_pts = r.scissor_pts([(680, 710), (940, 710), (950, 840), (670, 840)])
    r.add_cutout(sp_pts, WHITE_PAPER, depth=5)
    # Tree & Graph doodles in black pen
    r.pen_draw.line([(740, 790), (740, 825)], fill=BLACK_PEN, width=3)
    r.pen_draw.arc([715, 745, 765, 795], 0, 360, fill=BLACK_PEN, width=2)
    # Graph nodes
    for nx, ny in [(840, 750), (890, 740), (865, 800)]:
        r.pen_draw.ellipse([nx-6, ny-6, nx+6, ny+6], fill=BLACK_PEN)
    r.pen_draw.line([(840, 750), (890, 740)], fill=BLACK_PEN, width=2)
    r.pen_draw.line([(840, 750), (865, 800)], fill=BLACK_PEN, width=2)

    return r.finalize()

def render_contact_convo():
    # 11. contact-convo.jpg (1:1 square polaroid)
    r = CollageRenderer(1400, 1400, seed=111)

    # Cafe booth table cut from kraft paper
    table_pts = r.scissor_ellipse(700, 980, 480, 260, 48, jitter=3.0)
    r.add_cutout(table_pts, KRAFT_LIGHT, depth=2)
    # Table leg
    r.add_cutout(r.scissor_pts([(650, 980), (750, 980), (740, 1340), (660, 1340)]), KRAFT_BROWN, depth=1)

    # Saathvik sitting opposite the viewer, waving with small smile
    r.draw_saathvik(cx=700, cy=740, scale=1.2, pose='sitting', action='waving', depth_base=3)

    # His warm ceramic cup on his side of table
    r.draw_cup(cx=560, cy=960, scale=1.15, color=TERRACOTTA, depth=4)

    # Empty second cup waiting on our side of the table (foreground bottom right)
    r.draw_cup(cx=880, cy=1050, scale=1.3, color=TEAL, depth=5)

    # Paper postcard on table with stamp & lines
    pc_pts = r.scissor_pts([(640, 970), (800, 955), (815, 1070), (655, 1085)], jitter=1.5)
    r.add_cutout(pc_pts, WHITE_PAPER, depth=4, pen_outline=BLACK_PEN)
    # Stamp cutout in terracotta
    r.add_rectangle(765, 968, 28, 34, TERRACOTTA, depth=5)
    # Postcard message lines
    r.pen_draw.line([(665, 1000), (740, 995)], fill=BLACK_PEN, width=2)
    r.pen_draw.line([(665, 1025), (740, 1020)], fill=BLACK_PEN, width=2)
    r.pen_draw.line([(665, 1050), (730, 1045)], fill=BLACK_PEN, width=2)

    return r.finalize()

# -------------------------------------------------------------
# MAIN GENERATION PIPELINE
# -------------------------------------------------------------

def main():
    generators = {
        'hero-convo.jpg': render_hero_convo,
        'about-convo.jpg': render_about_convo,
        'proj-quorumdb.jpg': render_proj_quorumdb,
        'proj-aetherflow.jpg': render_proj_aetherflow,
        'proj-onroad.jpg': render_proj_onroad,
        'proj-switchboard.jpg': render_proj_switchboard,
        'proj-querymind.jpg': render_proj_querymind,
        'proj-pulse.jpg': render_proj_pulse,
        'proj-hybrid-llm-rbac.jpg': render_proj_hybrid_llm_rbac,
        'credentials-study.jpg': render_credentials_study,
        'contact-convo.jpg': render_contact_convo,
    }

    # Destination directories
    dest_dirs = [
        r'C:\Users\saath\Downloads\Portfolio-Showcase-journey\artifacts\portfolio\public\illustrations\journey',
        r'artifacts\portfolio\public\illustrations\journey',
    ]

    for d in dest_dirs:
        os.makedirs(d, exist_ok=True)

    print(f'Starting generation of {len(generators)} cut-paper collage illustrations...')

    for name, gen_fn in generators.items():
        print(f'Rendering {name}...')
        img = gen_fn()

        # Save to all destination directories
        for d in dest_dirs:
            out_path = os.path.join(d, name)
            img.save(out_path, 'JPEG', quality=88, optimize=True)
            print(f' -> Saved {out_path} ({os.path.getsize(out_path)} bytes)')

    print('\nAll 11 journey illustrations successfully generated and stored!')

if __name__ == '__main__':
    main()
