<p align="center">
  <img src="./logo.svg" width="384" alt="Qwik Reveal">
</p>

# Qwik Reveal ⚡️

Scroll and time-driven reveal animations for Qwik applications, based on modern web standards with graceful fallback for
full browser compatibility.

<br>

## Browser Support

This library is supported by **96%** of browsers.

### Scroll-driven animations

Scroll-driven animations are supported by [78%](https://caniuse.com/mdn-css_properties_animation-timeline) of browsers
and use
the [Scroll-driven Animations Module](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations).

> [!WARNING]
> Scroll-driven animations are unsupported by previous versions of Safari (v3-18) and Firefox.
>
> The time-driven fallback is automatically used for these browsers.

### Time-driven animations

Time-driven animations are supported by [96%](https://caniuse.com/intersectionobserver) of browsers and use
the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

<br>

## Preview

<img src="https://github.com/user-attachments/assets/a0ebc306-578c-4f4a-a648-9d9639c27b20"/>

<br>

## Installation

### 1. Install

Install the `@lgr.dev/qwik-reveal` dependency using your preferred package manager.

```shell
npm install @lgr.dev/qwik-reveal
```

### 2. Load `QwikReveal`

Include the `<QwikReveal/>` component in a `layout.tsx` (e.g. the root `src/routes/layout.tsx`).

> [!IMPORTANT]
> Loading `<QwikReveal/>` in `root.tsx` is not supported.
>
> This library depends on the `useLocation` API to support client-side
> navigation ([see more](https://qwik.dev/docs/api/#uselocation-in-roottsx-is-not-supported)).

```typescript jsx
import { component$, Slot } from '@builder.io/qwik';
import { QwikReveal } from '@lgr.dev/qwik-reveal';

export default component$(() => (
  <>
    <QwikReveal/>
    <Slot/>
  </>
));
```

<br>

## Usage

### 1. Reveal a single element

Individual elements can be animated by applying the `reveal` class directly to them.

```typescript jsx
<h2 class="reveal">Animates when scrolled into view</h2>
```

### 2. Reveal a group of elements

Groups of elements can be animated by applying the `reveal-group` class to their container.

```typescript jsx
<section class="reveal-group">
  <h2>Reveal together</h2>
  <p>Reveal together</p>
  <p>Reveal together</p>
</section>
```

You can optionally include the `reveal-stagger` class for a staggered reveal effect:

```typescript jsx
<section class="reveal-group reveal-stagger">
  <h2>Reveal first</h2>
  <p>Reveal second</p>
  <p>Reveal third</p>
</section>
```

### 3. Force time-driven animations

Force time-driven animations by including the `reveal--time` class, even for browsers that support scroll-driven
animations.

```typescript jsx
<h2 class="reveal reveal--time">Animates once when scrolled into view</h2>
```

### 4. Repeat time-driven animations

Repeat time-driven animations each time an element is scrolled into view by including the `reveal-repeat` class.

```typescript jsx
<h2 class="reveal reveal-repeat">Animates repeatedly when scrolled into view</h2>
```

<br>

## Modes

Animation modes can be configured for each target or container using the respective CSS class.

See the [Browser Support](#browser-support) section for more details.

### Auto (default)

This is the default mode when no mode class is specified on an element or its container.

- Prefers scroll-driven animations when supported by the browser.
- Falls back to time-driven animations on older browsers.

```typescript jsx
<h2 class="reveal">Automatic</h2>
```

### `reveal--scroll`

Forces scroll-driven animations regardless of browser compatibility.

- It is **not recommended** to explicitly set this.
- Forcing scroll-driven animations could lead to no animations being
  displayed in older browsers.

```typescript jsx
<h2 class="reveal reveal--scroll">Forces scroll-driven animation</h2>
```

### `reveal--time`

Forces time-driven animations even on browsers which support scroll-driven animation.

- Set this for stylistic reasons;
- or if you prefer complete uniformity across browsers.

```typescript jsx
<h2 class="reveal reveal--time">Forces time-driven animation</h2>
```

<br>

## Scroll Containers (Optional)

A common layout approach is to create a scroll container with multiple full-screen children.

When following this approach, include the `data-reveal-root` attribute on the scroll container.

```typescript jsx
export const Container = component$(() => (
  <main data-reveal-root class="overflow-y-auto h-full">
    ...
  </main>
));
```

And then include the `reveal-screen` class on each of the full-screen children that contain animated elements.

```typescript jsx
export const Container = component$(() => (
  <main data-reveal-root class="overflow-y-auto h-full">
    <section class="reveal-screen h-full">Screen One</section>
    <section class="reveal-screen h-full">Screen Two</section>
  </main>
));
```

<br>

## Attribute Reference

**`data-reveal-root`:** Declares an element as the scroll root for the time-driven scroll driver.

## Class Reference

### Target

**`reveal`:** Declares a single element as an animation target.

**`reveal-group`:** Declares a container whose direct children are animation targets.

**`reveal-ignore`:** Exclude a child from group targeting.

### Stagger

**`reveal-stagger`:** Enables animation staggering within a targeted group.

- Scroll-driven: Range staggering using runtime indices and CSS math.
- Time-driven: Time staggering using runtime indices and CSS `animation-delay`.

### Mode

**`reveal--time`:** Forces scroll-driven animations regardless of browser compatibility.
**`reveal--scroll`:** Forces time-driven animations even on browsers which support scroll-driven animation.

### Trigger (Time-driven)

**`reveal-trigger--self`:**

### Scope (Scroll-driven)

**`reveal-scope--screen`:**

**`reveal-scope--view`:**

### Playback (Time-driven)

**`reveal-repeat`:** Replays the time-driven animation whenever the target leaves and re-enters the view.

**`reveal-initial-animate`:** Animates the target even if already visible (i.e. above the fold).

### Presets

**`reveal-range--soft`:** Earlier, shorter, and more subtle animation.

**`reveal-range--mid`:** Balanced animation (default).

**`reveal-range--late`:** Later, slower, stronger animation.

<br>

## Troubleshooting

- If scroll-driven reveals appear to do nothing, ensure you are not using `overflow: hidden` or `overflow-x: hidden` on
  `html`,
  `body`, or ancestors of the scroll container. Prefer `overflow-x: clip` instead.

- If scroll-driven animations complete before content becomes visible inside a full-height `.screen`, apply
  `reveal-scope--view` to that group, or move the stagger distribution later via the stagger min/max tokens.

- For grid sequences, force `reveal--time` to avoid awkward row/column inconsistencies in scroll mode.
