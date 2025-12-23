<p align="center">
  <img src="./logo.svg" width="384" alt="Qwik Reveal">
</p>

# Qwik Reveal ⚡️

Scroll and time-driven reveal animations for Qwik applications, based on modern web standards with graceful fallback for
full browser compatibility.

<!-- TOC -->

* [Introduction](#qwik-reveal-)
  * [Browser Support](#browser-support)
  * [Preview](#preview)
* [Get Started](#get-started)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Modes](#modes)
  * [Scroll Containers (Optional)](#scroll-containers-optional)
* [Customisation](#customisation)
  * [Attribute Reference](#attribute-reference)
  * [Class Reference](#class-reference)
  * [Animation Presets](#animation-presets)
  * [Custom Properties (Variables)](#custom-properties-variables)
* [Troubleshooting](#troubleshooting)

<!-- TOC -->

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

# Get Started

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

# Customisation

## Attribute Reference

| **Attribute Name** | Description                                                               |
|--------------------|---------------------------------------------------------------------------|
| `data-reveal-root` | Declares an element as the scroll root for the time-driven scroll driver. |

## Class Reference

| **Class Name**                  | Description                                                                           |
|---------------------------------|---------------------------------------------------------------------------------------|
| <br/>**Target**                 |                                                                                       |
| `reveal`                        | Declares a single element as an animation target.                                     |
| `reveal-group`                  | Declares a container whose direct children are animation targets.                     |
| `reveal-ignore`                 | Exclude a child from group targeting.                                                 |
| <br/>**Stagger**                |                                                                                       |
| `reveal-stagger`                | Enables animation staggering within a targeted group.                                 |
| <br/>**Mode**                   |                                                                                       |
| `reveal--time`                  | Forces time-driven animations even on browsers which support scroll-driven animation. |
| `reveal--scroll`                | Forces scroll-driven animations regardless of browser compatibility.                  |
| <br/>**Trigger (Time-driven)**  |                                                                                       |
| `reveal-trigger--self`          |                                                                                       |
| <br/>**Scope (Scroll-driven)**  |                                                                                       |
| `reveal-scope--screen`          |                                                                                       |
| `reveal-scope--view`            |                                                                                       |
| <br/>**Playback (Time-driven)** |                                                                                       |
| `reveal-repeat`                 | Replays the time-driven animation whenever the target leaves and re-enters the view.  |
| `reveal-initial-animate`        | Animates the target even if already visible (i.e. above the fold).                    |

## Animation Presets

| Class Name                 | **Description**                         |
|----------------------------|-----------------------------------------|
| <br/>**Range**             |                                         |
| `reveal-range--very-early` | Animation begins and ends very early.   |
| `reveal-range--early`      | Animation is earlier and more subtle.   |
| `reveal-range--mid`        | Balanced animation (default).           |
| `reveal-range--late`       | Animation is later and more pronounced. |
| `reveal-range--very-late`  | Animation begins and ends very late.    |
| <br/>**From (Direction)**  |                                         |
| `reveal-from--left`        | Animates in from the left.              |
| `reveal-from--right`       | Animates in from the right.             |
| `reveal-from--top`         | Animates in from the top.               |
| `reveal-from--bottom`      | Animates in from the bottom.            |

## Custom Properties (Variables)

| Token Name        | **Description** |
|-------------------|-----------------|
| <br/>**Position** |                 |
|                   |                 |

<br>

## Troubleshooting

- If scroll-driven reveals appear to do nothing, ensure you are not using `overflow: hidden` or `overflow-x: hidden` on
  `html`,
  `body`, or ancestors of the scroll container. Prefer `overflow-x: clip` instead.

- If scroll-driven animations complete before content becomes visible inside a full-height `.screen`, apply
  `reveal-scope--view` to that group, or move the stagger distribution later via the stagger min/max tokens.

- For grid sequences, force `reveal--time` to avoid awkward row/column inconsistencies in scroll mode.
