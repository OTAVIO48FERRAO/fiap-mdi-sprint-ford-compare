// components/SideMenu.tsx
import React from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SHADOW, SPACING } from '../constants/theme';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
}

interface MenuButtonProps {
  onPress: () => void;
}

const MENU_ITEMS = [
  { label: 'Dashboard', caption: 'Painel operacional', route: '/' },
  { label: 'Monitoramento', caption: 'Telemetria ao vivo', route: '/monitoring' },
  { label: 'Comparação', caption: 'Ranger Raptor vs concorrentes', route: '/comparison' },
  { label: 'Ranger Raptor', caption: 'Ficha técnica completa', route: '/details' },
  { label: 'Relatório', caption: 'Resumo técnico e telemetria', route: '/report' },
  { label: 'Sobre', caption: 'Projeto e arquitetura', route: '/about' },
] as const;

export const MenuButton: React.FC<MenuButtonProps> = ({ onPress }) => (
  <Pressable
    style={styles.menuButton}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel="Abrir menu"
  >
    <View style={styles.menuIcon}>
      <View style={styles.menuLine} />
      <View style={styles.menuLine} />
      <View style={styles.menuLine} />
    </View>
    <Text style={styles.menuButtonLabel}>Menu</Text>
  </Pressable>
);

export const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (route: string) => {
    onClose();

    if (route === '/comparison' && pathname !== '/comparison') {
      router.push(route);
      return;
    }

    router.replace(route);
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('currentUser');
    } finally {
      onClose();
      router.replace('/login');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <View>
              <Text style={styles.panelKicker}>FORD INTELLIGENCE</Text>
              <Text style={styles.panelTitle}>Ranger Raptor</Text>
              <Text style={styles.panelSubtitle}>Vehicle Intelligence</Text>
            </View>

            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>
          </View>

          <View style={styles.vehicleCard}>
            <View style={styles.vehicleMarker} />
            <View style={styles.vehicleCardBody}>
              <Text style={styles.vehicleCardLabel}>VEÍCULO ATIVO</Text>
              <Text style={styles.vehicleCardTitle}>Ranger Raptor</Text>
              <Text style={styles.vehicleCardMeta}>3.0 V6 Bi-Turbo · 397 cv</Text>
            </View>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveBadgeText}>LIVE</Text>
            </View>
          </View>

          <View style={styles.sectionLabelWrap}>
            <Text style={styles.sectionLabel}>NAVEGAÇÃO</Text>
          </View>

          <View style={styles.items}>
            {MENU_ITEMS.map((item, index) => {
              const active =
                (item.route === '/' && pathname === '/') ||
                (item.route !== '/' && pathname === item.route);

              return (
                <Pressable
                  key={`${item.label}-${index}`}
                  style={[styles.menuItem, active && styles.menuItemActive]}
                  onPress={() => handleNavigate(item.route)}
                >
                  <View style={[styles.itemIndicator, active && styles.itemIndicatorActive]} />
                  <View style={styles.itemText}>
                    <Text style={[styles.itemLabel, active && styles.itemLabelActive]}>
                      {item.label}
                    </Text>
                    <Text style={styles.itemCaption}>{item.caption}</Text>
                  </View>
                  <Text style={[styles.itemArrow, active && styles.itemArrowActive]}>›</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.divider} />

          <View style={styles.panelFooter}>
            <Pressable style={styles.signOutItem} onPress={handleSignOut}>
              <Text style={styles.signOutIcon}>⇥</Text>
              <Text style={styles.signOutText}>Sair da sessão</Text>
            </Pressable>

            <Text style={styles.footerNote}>MVP acadêmico · dados locais</Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.navy,
    borderWidth: 1,
    borderColor: '#35506A',
    borderRadius: 10,
    minHeight: 40,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  menuIcon: {
    width: 20,
    height: 16,
    justifyContent: 'space-between',
    marginRight: 8,
  },
  menuLine: {
    width: 20,
    height: 2,
    borderRadius: 2,
    backgroundColor: COLORS.white,
  },
  menuButtonLabel: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(2, 8, 14, 0.45)',
  },
  panel: {
    width: '84%',
    maxWidth: 390,
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    ...SHADOW.card,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  panelKicker: {
    color: COLORS.blue,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  panelTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 4,
  },
  panelSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 3,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.surfaceSoft,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: COLORS.textSecondary,
    fontSize: 24,
    fontWeight: '300',
    lineHeight: 24,
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.navy,
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.xl,
  },
  vehicleMarker: {
    width: 4,
    height: 44,
    borderRadius: 2,
    backgroundColor: COLORS.blueAlt,
    marginRight: 12,
  },
  vehicleCardBody: {
    flex: 1,
  },
  vehicleCardLabel: {
    color: '#A7C0D6',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  vehicleCardTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 3,
  },
  vehicleCardMeta: {
    color: '#D4E0EA',
    fontSize: 9,
    marginTop: 3,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#38D49B',
    marginRight: 5,
  },
  liveBadgeText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  sectionLabelWrap: {
    marginBottom: SPACING.sm,
  },
  sectionLabel: {
    color: COLORS.textMuted,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
  },
  items: {
    gap: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
    borderRadius: 12,
    paddingHorizontal: 10,
    backgroundColor: COLORS.surface,
  },
  menuItemActive: {
    backgroundColor: COLORS.blueSoft,
  },
  itemIndicator: {
    width: 4,
    height: 30,
    borderRadius: 2,
    backgroundColor: 'transparent',
    marginRight: 11,
  },
  itemIndicatorActive: {
    backgroundColor: COLORS.blue,
  },
  itemText: {
    flex: 1,
  },
  itemLabel: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '800',
  },
  itemLabelActive: {
    color: COLORS.blueDeep,
  },
  itemCaption: {
    color: COLORS.textMuted,
    fontSize: 9,
    marginTop: 3,
  },
  itemArrow: {
    color: COLORS.textMuted,
    fontSize: 24,
    fontWeight: '300',
    marginLeft: 8,
  },
  itemArrowActive: {
    color: COLORS.blue,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  panelFooter: {
    paddingBottom: 2,
  },
  signOutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  signOutIcon: {
    color: COLORS.danger,
    fontSize: 18,
    marginRight: 9,
  },
  signOutText: {
    color: COLORS.danger,
    fontSize: 11,
    fontWeight: '800',
  },
  footerNote: {
    color: COLORS.textMuted,
    fontSize: 8,
    marginTop: 10,
  },
});
