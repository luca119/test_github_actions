import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import GameControls from '~/components/GameControls.vue'
import { createTestingPinia } from '@pinia/testing'

describe('GameControls score tests', () => {
  test('score higher than 128 should be orange', () => {

    const wrapper = mount(GameControls, {
      global: {
        plugins: [createTestingPinia({createSpy: vi.fn})],
      },
      props:{
        score: 130
      }
    })

    const div = wrapper.get('[data-test="score"]')

    expect(div.element.classList.value).toContain("text-orange-500")
  })

  test('score lower than 128 should be light', () => {

    const wrapper = mount(GameControls, {
      global: {
        plugins: [createTestingPinia({createSpy: vi.fn})],
      },
      props:{
        score: 127
      }
    })

    const div = wrapper.get('[data-test="score"]')

    expect(div.element.classList.value).toContain("text-light-800")
  })
})