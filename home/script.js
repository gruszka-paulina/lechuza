const menuToggleBtn = document.getElementById('menu-toggle-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLangDropdown = document.getElementById('mobile-lang-dropdown');
const mobileLangBtn = document.getElementById('mobile-lang-btn');
const mobileLangChevron = mobileLangBtn
	? mobileLangBtn.querySelector('.bi-chevron-down')
	: null;

menuToggleBtn.addEventListener('click', () => {
	const isOpen = mobileMenu.classList.toggle('is-open');
	menuToggleBtn.classList.toggle('is-active', isOpen);

	if (!isOpen) {
		if (mobileLangDropdown) mobileLangDropdown.classList.add('hidden');
		if (mobileLangChevron) mobileLangChevron.classList.remove('rotate-180');
	}
});

const mobileSubmenuToggles = document.querySelectorAll(
	'.mobile-submenu-toggle',
);
mobileSubmenuToggles.forEach((toggle) => {
	toggle.addEventListener('click', () => {
		const currentRow = toggle.parentElement;
		const associatedDropdown = currentRow.nextElementSibling;

		if (
			associatedDropdown &&
			associatedDropdown.classList.contains('dropdown-container')
		) {
			const isHidden = associatedDropdown.classList.toggle('hidden');
			const chevron = toggle.querySelector('.bi-chevron-down');
			if (chevron) {
				chevron.classList.toggle('rotate-180', !isHidden);
			}
		}
	});
});

if (mobileLangBtn && mobileLangDropdown) {
	mobileLangBtn.addEventListener('click', () => {
		const isHidden = mobileLangDropdown.classList.toggle('hidden');
		if (mobileLangChevron) {
			mobileLangChevron.classList.toggle('rotate-180', !isHidden);
		}
		if (!isHidden) {
			setTimeout(() => {
				mobileLangDropdown.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
				});
			}, 100);
		}
	});
}

const langBtn = document.getElementById('lang-btn');
const desktopLangDropdown = document.getElementById('desktop-lang-dropdown');
const langClose = document.getElementById('lang-close');
const langChevron = langBtn ? langBtn.querySelector('.bi-chevron-down') : null;

if (langBtn && desktopLangDropdown) {
	langBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		const isClosed = desktopLangDropdown.classList.toggle('hidden');
		if (langChevron) langChevron.classList.toggle('rotate-180', !isClosed);
	});
}

if (langClose && desktopLangDropdown) {
	langClose.addEventListener('click', () => {
		desktopLangDropdown.classList.add('hidden');
		if (langChevron) langChevron.classList.remove('rotate-180');
	});
}

document.addEventListener('click', (e) => {
	if (
		desktopLangDropdown &&
		langBtn &&
		!desktopLangDropdown.contains(e.target) &&
		!langBtn.contains(e.target)
	) {
		desktopLangDropdown.classList.add('hidden');
		if (langChevron) langChevron.classList.remove('rotate-180');
	}
});

const footerToggles = document.querySelectorAll('.footer-toggle');
footerToggles.forEach((toggle) => {
	toggle.addEventListener('click', function () {
		if (window.innerWidth < 1024) {
			const ulList = this.nextElementSibling;
			const chevron = this.querySelector('.bi-chevron-down');

			if (ulList) {
				if (
					ulList.style.display === 'flex' ||
					ulList.classList.contains('is-visible')
				) {
					ulList.style.display = 'none';
					ulList.classList.remove('is-visible');
				} else {
					ulList.style.display = 'flex';
					ulList.classList.add('is-visible');
				}
			}
			if (chevron) {
				chevron.classList.toggle('rotate-180');
			}
		}
	});
});

document.querySelectorAll('.color-swatch').forEach((swatch) => {
	swatch.addEventListener('mouseenter', function () {
		const newSrc = this.getAttribute('data-variant-img');
		if (!newSrc) return;

		const card = this.closest('.product-card');
		const mainImg = card.querySelector('.main-product-image');

		if (mainImg) {
			mainImg.src = newSrc;

			if (mainImg.hasAttribute('data-src')) {
				mainImg.setAttribute('data-src', newSrc);
			}
		}
	});
});

document.addEventListener('DOMContentLoaded', () => {
	const compareContainer = document.getElementById('compare-container');
	if (!compareContainer) return;

	const slotElements = document.querySelectorAll('.compare-slot');
	const submitBtn = document.getElementById('compare-submit-btn');
	const clearAllBtn = document.getElementById('compare-clear-all');
	const checkboxes = document.querySelectorAll('.custom-checkbox');

	const MAX_ITEMS = 4;
	let selectedItems = [];

	function updateCompareUI() {
		if (selectedItems.length > 0) {
			compareContainer.style.display = 'flex';
		} else {
			compareContainer.style.display = 'none';
		}

		submitBtn.disabled =
			selectedItems.length < 2 || selectedItems.length > MAX_ITEMS;

		checkboxes.forEach((cb) => {
			cb.disabled = !cb.checked && selectedItems.length >= MAX_ITEMS;
		});

		slotElements.forEach((slot, index) => {
			const img = slot.querySelector('.slot-img');
			const btn = slot.querySelector('.remove-btn');
			const item = selectedItems[index];

			if (item) {
				img.src = item.imgSrc;
				img.style.display = 'block';
				btn.style.display = 'block';
				slot.classList.remove('empty');
			} else {
				img.src = '';
				img.style.display = 'none';
				btn.style.display = 'none';
				slot.classList.add('empty');
			}
		});
	}
	function removeItem(id) {
		const itemIndex = selectedItems.findIndex((item) => item.id === id);
		if (itemIndex !== -1) {
			selectedItems[itemIndex].checkboxRef.checked = false;
			selectedItems.splice(itemIndex, 1);
			updateCompareUI();
		}
	}

	checkboxes.forEach((checkbox) => {
		checkbox.addEventListener('change', (e) => {
			const card = e.target.closest('.product-card');
			if (!card) return;

			const productId =
				card.getAttribute('data-id') ||
				card.querySelector('a')?.innerText;
			const imgSrc =
				card.getAttribute('data-img') ||
				card.querySelector('.main-product-image')?.src;

			if (e.target.checked) {
				if (selectedItems.length < MAX_ITEMS) {
					selectedItems.push({
						id: productId,
						imgSrc,
						checkboxRef: e.target,
					});
				}
			} else {
				selectedItems = selectedItems.filter(
					(item) => item.id !== productId,
				);
			}

			updateCompareUI();
		});
	});

	slotElements.forEach((slot, index) => {
		const btn = slot.querySelector('.remove-btn');
		btn.addEventListener('click', () => {
			if (selectedItems[index]) {
				removeItem(selectedItems[index].id);
			}
		});
	});

	clearAllBtn.addEventListener('click', () => {
		selectedItems.forEach((item) => (item.checkboxRef.checked = false));
		selectedItems = [];
		updateCompareUI();
	});
});

const filterButtons = document.querySelectorAll('.filter-tab-btn');
const filterPanels = document.querySelectorAll('.filter-panel');

function closeAllFilters() {
	filterPanels.forEach((panel) => panel.classList.add('hidden'));
	filterButtons.forEach((btn) => {
		btn.classList.remove(
			'bg-white',
			'border-solid',
			'border-gray-300',
			'border-b-white',
			'mb-[-1px]',
		);
		btn.classList.add('bg-[#f9f9f9]', 'border-transparent');
	});
}

filterButtons.forEach((button) => {
	button.addEventListener('click', (e) => {
		const targetId = button.getAttribute('data-filter-target');
		const targetPanel = document.getElementById(targetId);

		const isAlreadyOpen = !targetPanel.classList.contains('hidden');

		closeAllFilters();

		if (!isAlreadyOpen) {
			targetPanel.classList.remove('hidden');

			button.classList.remove('bg-[#f9f9f9]', 'border-transparent');
			button.classList.add(
				'bg-white',
				'border',
				'border-solid',
				'border-gray-300',
				'border-b-white',
				'mb-[-1px]',
				'relative',
				'z-20',
			);
		}
	});
});

document.querySelectorAll('.filter-close-btn').forEach((closeBtn) => {
	closeBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		closeAllFilters();
	});
});

document
	.getElementById('mobile-filter-trigger')
	.addEventListener('click', () => {
		const container = document.getElementById('filter-container');
		container.classList.toggle('hidden');
		container.classList.toggle('flex');
	});

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.js-product-card').forEach((card) => {
		const mainImage = card.querySelector('.js-main-image');
		const prevBtn = card.querySelector('.js-prev-btn');
		const nextBtn = card.querySelector('.js-next-btn');
		const thumbnails = card.querySelectorAll('.js-thumb');

		// Jeśli brakuje kluczowych elementów, zatrzymaj inicjalizację tej karty
		if (!mainImage || !thumbnails.length) return;

		// Magia: Zapamiętujemy DOKŁADNY wygląd miniaturki aktywnej i nieaktywnej prosto z HTML
		const activeStyleString = thumbnails[0].className;
		const inactiveStyleString = thumbnails[1]
			? thumbnails[1].className
			: thumbnails[0].className;

		let currentIndex = 0;
		const totalImages = thumbnails.length;

		const updateCarousel = (index) => {
			currentIndex = index;
			const activeThumb = thumbnails[currentIndex];

			if (!activeThumb) return;

			// Pobranie dużego zdjęcia
			const largeSrc = activeThumb.getAttribute('data-large-src');
			if (largeSrc) {
				mainImage.src = largeSrc;
				mainImage.setAttribute('data-src', largeSrc); // Wymagane, jeśli na stronie działa lazy-loading!
			}

			// Podmiana całego stringu klas – bezpieczne, szybkie i odporne na błędy
			thumbnails.forEach((thumb, i) => {
				thumb.className =
					i === currentIndex
						? activeStyleString
						: inactiveStyleString;
			});
		};

		// Obsługa strzałek (modulo)
		prevBtn?.addEventListener('click', () => {
			updateCarousel((currentIndex - 1 + totalImages) % totalImages);
		});

		nextBtn?.addEventListener('click', () => {
			updateCarousel((currentIndex + 1) % totalImages);
		});

		// Obsługa kliknięć w miniaturki
		thumbnails.forEach((thumb, index) => {
			thumb.addEventListener('click', () => {
				updateCarousel(index);
			});
		});
	});
});
