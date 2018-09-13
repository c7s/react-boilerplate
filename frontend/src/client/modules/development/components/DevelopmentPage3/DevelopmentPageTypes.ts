/** External file */

export interface SCOuterProps<THEME_NAME = string> {
    className?: string;
    themeName?: THEME_NAME;
}

export interface SCInnerProps<THEME = string> {
    className?: string;
    theme?: THEME;
}

/** This file */

/** Inner props */

/** Custom types */

/**
 * Плюсы:
 * - Можно перемапливать типы между слоями
 * Минусы:
 * - Нужно думать как на уровне "что входит", так и "что выходит"
 * - Сложно понять, из какого слоя взялся пропс
 * - Дублирование одинаковых частей интерфейсов
 * - Нужно тянуть в каждый интерфейс общие штуки только для прокидывания в tsx (SCOuterProps)
 */
